import { useState, useEffect, useMemo } from 'react';
import './index.css';
import { workoutData, days } from './workoutData';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedStates: Record<string, boolean> = {};
    for (let i = 0; i < 100; i++) {
      const key = `workout-checkbox-${i}`;
      const value = localStorage.getItem(key);
      if (value === 'true') {
        savedStates[key] = true;
      }
    }
    setCheckboxStates(savedStates);
  }, []);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckboxStates(prev => ({ ...prev, [key]: checked }));
    localStorage.setItem(key, String(checked));
  };

  const resetAll = () => {
    setCheckboxStates({});
    localStorage.clear();
  };

  // Pre-calculate all checkbox indices to avoid re-render issues
  const checkboxMap = useMemo(() => {
    const map: { day: string; section?: string; exercise?: string; index: number }[] = [];
    let currentIndex = 0;

    days.forEach(day => {
      const content = workoutData[day];
      if (content.type === 'run') {
        map.push({ day, index: currentIndex++ });
      } else {
        content.sections?.forEach(section => {
          section.exercises.forEach(exercise => {
            map.push({ day, section: section.title, exercise: exercise.name, index: currentIndex++ });
          });
        });
      }
    });

    return map;
  }, []);

  return (
    <div className="container">
      <div className="tabs-container">
        <div className="tabs">
          {days.map((day, index) => (
            <div
              key={day}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {day}
            </div>
          ))}
        </div>
        <button className="reset-btn" onClick={resetAll}>
          Reset
        </button>
      </div>

      {days.map((day, dayIndex) => {
        const content = workoutData[day];
        const isActive = activeTab === dayIndex;

        return (
          <div key={day} className={`tab-content ${isActive ? 'active' : ''}`}>
            {content.type === 'run' ? (
              <div className="run-section">
                <div className="run-title">{content.runTitle}</div>
                <div className="run-details">{content.runDetails?.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}</div>
                <div className="exercise">
                  {(() => {
                    const checkboxIndex = checkboxMap.find(m => m.day === day && !m.exercise)?.index ?? 0;
                    return (
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checkboxStates[`workout-checkbox-${checkboxIndex}`] || false}
                        onChange={(e) => handleCheckboxChange(`workout-checkbox-${checkboxIndex}`, e.target.checked)}
                      />
                    );
                  })()}
                  <div className="exercise-details">
                    <div className="exercise-name">Completed Run</div>
                  </div>
                </div>
              </div>
            ) : (
              content.sections?.map((section) => (
                <div key={section.title} className="section">
                  <div className="section-title">{section.title}</div>
                  {section.exercises.map((exercise) => {
                    const checkboxIndex = checkboxMap.find(
                      m => m.day === day && m.section === section.title && m.exercise === exercise.name
                    )?.index ?? 0;
                    return (
                      <div key={exercise.name} className="exercise">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={checkboxStates[`workout-checkbox-${checkboxIndex}`] || false}
                          onChange={(e) => handleCheckboxChange(`workout-checkbox-${checkboxIndex}`, e.target.checked)}
                        />
                        <div className="exercise-details">
                          <div className="exercise-name">
                            {exercise.name}
                            <span className="info-icon">
                              i
                              <span className="tooltip">{exercise.tooltip}</span>
                            </span>
                          </div>
                          <div className="exercise-sets">{exercise.sets}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
