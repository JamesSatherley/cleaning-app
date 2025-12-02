import { useState, useEffect } from 'react';
import './index.css';

interface Exercise {
  name: string;
  sets: string;
  tooltip: string;
}

interface WorkoutSection {
  title: string;
  exercises: Exercise[];
}

interface DayContent {
  type: 'workout' | 'run';
  sections?: WorkoutSection[];
  runTitle?: string;
  runDetails?: string;
}

const workoutData: Record<string, DayContent> = {
  Monday: {
    type: 'workout',
    sections: [
      {
        title: 'Push',
        exercises: [
          { name: 'Bench Press', sets: '4 sets × 8-12 reps', tooltip: 'Lie on bench, lower bar to chest, press up. Start with just the bar to learn proper form.' },
          { name: 'Overhead Press', sets: '3 sets × 8-12 reps', tooltip: 'Standing or seated, press weight from shoulders straight overhead. Keep core tight.' },
          { name: 'Incline Dumbbell Press', sets: '3 sets × 10-12 reps', tooltip: 'Set bench at 30-45 degree angle. Press dumbbells up from chest level. Targets upper chest.' },
          { name: 'Tricep Pushdowns', sets: '3 sets × 12-15 reps', tooltip: 'Cable machine with rope or bar. Push down to straighten arms, keep elbows still.' },
          { name: 'Lateral Raises', sets: '3 sets × 12-15 reps', tooltip: 'Stand with dumbbells at sides. Raise arms out to shoulder height, slight bend in elbows.' }
        ]
      },
      {
        title: 'Core',
        exercises: [
          { name: 'Plank', sets: '3 sets × 30-60 sec hold', tooltip: 'Forearms on ground, body straight. Hold position, don\'t let hips sag.' },
          { name: 'Dead Bugs', sets: '3 sets × 12 each side', tooltip: 'Lie on back. Extend opposite arm and leg, alternate sides. Keep lower back pressed to floor.' },
          { name: 'Russian Twists', sets: '3 sets × 20 total', tooltip: 'Sit with feet off ground, hold weight. Twist torso side to side, touching weight to floor each side.' },
          { name: 'Hanging Knee Raises', sets: '3 sets × 10-15 reps', tooltip: 'Hang from pullup bar, bring knees up to chest. If too hard, do lying leg raises instead.' }
        ]
      }
    ]
  },
  Tuesday: {
    type: 'run',
    runTitle: 'Running Day',
    runDetails: '30-45 minutes\nMix steady pace with intervals'
  },
  Wednesday: {
    type: 'workout',
    sections: [
      {
        title: 'Pull',
        exercises: [
          { name: 'Lat Pulldown', sets: '4 sets × 8-12 reps', tooltip: 'Cable machine, pull bar down to chest. Focus on squeezing shoulder blades together.' },
          { name: 'Seated Cable Rows', sets: '4 sets × 10-12 reps', tooltip: 'Sit at cable station, pull handle to stomach. Keep back straight, squeeze shoulder blades at end.' },
          { name: 'Dumbbell Rows', sets: '3 sets × 10-12 each arm', tooltip: 'One hand on bench for support. Pull dumbbell up to hip, elbow stays close to body.' },
          { name: 'Face Pulls', sets: '3 sets × 12-15 reps', tooltip: 'Cable with rope attachment. Pull to face level, elbows high. Great for rear shoulders and posture.' },
          { name: 'Bicep Curls', sets: '3 sets × 10-12 reps', tooltip: 'Keep elbows still at sides. Curl weight up, squeeze at top, control down.' }
        ]
      },
      {
        title: 'Core',
        exercises: [
          { name: 'Side Plank', sets: '3 sets × 30-45 sec each side', tooltip: 'On side, elbow under shoulder. Lift hips off ground, hold straight line.' },
          { name: 'Mountain Climbers', sets: '3 sets × 20 total', tooltip: 'Pushup position, bring knees to chest alternating. Keep hips level, move at steady pace.' },
          { name: 'Pallof Press', sets: '3 sets × 12 each side', tooltip: 'Cable at chest height, stand sideways. Press out, resist rotation. Anti-rotation core training.' },
          { name: 'Cable Crunches', sets: '3 sets × 15 reps', tooltip: 'Kneel facing cable machine, rope behind head. Crunch down, pull with abs not arms.' }
        ]
      }
    ]
  },
  Thursday: {
    type: 'run',
    runTitle: 'Running Day',
    runDetails: '30-45 minutes\nConversational pace'
  },
  Friday: {
    type: 'workout',
    sections: [
      {
        title: 'Legs',
        exercises: [
          { name: 'Squats', sets: '4 sets × 8-12 reps', tooltip: 'Bar on upper back. Sit back and down, knees track over toes. Start with just the bar to learn form.' },
          { name: 'Romanian Deadlifts', sets: '3 sets × 10-12 reps', tooltip: 'Hinge at hips, lower weight down front of legs. Keep back straight, feel hamstring stretch.' },
          { name: 'Leg Press', sets: '3 sets × 12-15 reps', tooltip: 'Sit in machine, feet shoulder-width. Push platform away until legs nearly straight.' },
          { name: 'Leg Curl', sets: '3 sets × 12-15 reps', tooltip: 'Lie face down on machine. Curl legs up toward glutes, control the descent.' },
          { name: 'Calf Raises', sets: '3 sets × 15-20 reps', tooltip: 'Stand on edge with heels hanging. Rise up on toes, squeeze at top, control down below starting point.' }
        ]
      },
      {
        title: 'Core',
        exercises: [
          { name: 'Plank Variations', sets: 'Front + side planks', tooltip: 'Do front plank, then side planks. Mix it up each set for variety.' },
          { name: 'Bicycle Crunches', sets: '3 sets × 20 total', tooltip: 'Lie on back, bring opposite elbow to knee in cycling motion. Slow and controlled.' },
          { name: 'Farmer\'s Carries', sets: '3 sets × 30-40 meters', tooltip: 'Hold heavy dumbbells at sides, walk steadily. Keep shoulders back, core tight.' },
          { name: 'Ab Wheel Rollouts', sets: '3 sets × 10 reps', tooltip: 'On knees, roll wheel out keeping back straight. Pull back with abs. If too hard, do shorter range.' }
        ]
      }
    ]
  }
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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

  let checkboxIndex = 0;

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
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkboxStates[`workout-checkbox-${checkboxIndex}`] || false}
                    onChange={(e) => handleCheckboxChange(`workout-checkbox-${checkboxIndex}`, e.target.checked)}
                  />
                  <div className="exercise-details">
                    <div className="exercise-name">Completed Run</div>
                  </div>
                </div>
                <span style={{ display: 'none' }}>{checkboxIndex++}</span>
              </div>
            ) : (
              content.sections?.map((section) => (
                <div key={section.title} className="section">
                  <div className="section-title">{section.title}</div>
                  {section.exercises.map((exercise) => {
                    const currentIndex = checkboxIndex++;
                    return (
                      <div key={exercise.name} className="exercise">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={checkboxStates[`workout-checkbox-${currentIndex}`] || false}
                          onChange={(e) => handleCheckboxChange(`workout-checkbox-${currentIndex}`, e.target.checked)}
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
