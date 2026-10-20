// Pain Bingo content — from the MotionPlus "Bingo for Pain" clinical document.
// One entry per bingo square, in card order (B1, I1, N1, G1, O1, B2 …).
// Each symptom has 5 exercises, simple tips and safety advice.
// `sec` is the timer length used by the guided player, estimated from the dose.
// Note: in the source PDF, the Stiff Fingers tips and safety advice were printed
// under Tight Hamstrings; they are placed back under Stiff Fingers here.

export const BINGO_GUIDE = [
  {
    "slug": "neck-stiffness",
    "name": "Neck Stiffness",
    "aka": null,
    "exercises": [
      {
        "title": "Pull Your Chin Back",
        "text": "Sit or stand tall and gently pull your chin straight backward, as if making a double chin. Hold for 5 seconds and repeat 10 times.",
        "dose": null,
        "sec": 45
      },
      {
        "title": "Turn Your Head Side to Side",
        "text": "Slowly turn your head to look over one shoulder, then return to the center and repeat on the other side. Perform 10 times on each side without forcing the movement.",
        "dose": null,
        "sec": 45
      },
      {
        "title": "Stretch the Side of Your Neck",
        "text": "Tilt your head toward one shoulder until you feel a gentle stretch on the opposite side of your neck. Hold for 20 seconds and repeat 3 times on each side.",
        "dose": null,
        "sec": 60
      },
      {
        "title": "Relax the Top of Your Shoulder",
        "text": "Sit comfortably and gently tilt your head away from the affected shoulder while keeping the shoulder relaxed. Hold for 20 seconds and repeat 3 times.",
        "dose": null,
        "sec": 60
      },
      {
        "title": "Squeeze Your Shoulder Blades",
        "text": "Sit or stand upright and gently squeeze your shoulder blades together without lifting your shoulders. Hold for 5 seconds and repeat 15 times.",
        "dose": null,
        "sec": 45
      }
    ],
    "tips": [
      "Keep your phone or computer screen at eye level.",
      "Take a stretching break every 30–45 minutes.",
      "A warm pack may help relieve muscle stiffness.",
      "Stop if you experience severe pain, dizziness, or numbness."
    ],
    "safety": {
      "intro": null,
      "when": null,
      "flags": [],
      "remember": null
    }
  },
  {
    "slug": "dry-eyes",
    "name": "Dry Eyes",
    "aka": null,
    "exercises": [
      {
        "title": "Blink Slowly and Fully",
        "text": "Sit comfortably and slowly close your eyes, then open them completely. Repeat this 20 times to help spread your natural tears evenly across the eyes and reduce dryness.",
        "dose": "Repetitions: 20 blinks",
        "sec": 45
      },
      {
        "title": "Rest Your Eyes (20-20-20 Rule)",
        "text": "Every 20 minutes, look away from your screen at something about 20 feet (6 meters) away for at least 20 seconds. This helps relax your eye muscles and reduce strain.",
        "dose": "Duration: Every 20 minutes",
        "sec": 20
      },
      {
        "title": "Warm Eye Relaxation",
        "text": "Close your eyes and gently place your warm palms over them without applying pressure. Relax and breathe normally while keeping your eyes covered.",
        "dose": "Duration: 30–60 seconds × 3",
        "sec": 120
      },
      {
        "title": "Look Around Slowly",
        "text": "Without moving your head, slowly move your eyes up, down, left, right, and then in a circular motion. This helps relax the eye muscles after prolonged screen use.",
        "dose": "Repetitions: 10 times in each direction",
        "sec": 45
      },
      {
        "title": "Focus Near and Far",
        "text": "Hold your thumb about 30 cm (12 inches) in front of you and focus on it for 5 seconds. Then shift your focus to an object farther away for another 5 seconds. Repeat slowly.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Blink more often while using a phone or computer.",
      "Keep your screen slightly below eye level to reduce eye opening and dryness.",
      "Stay well hydrated by drinking enough water throughout the day.",
      "Reduce screen brightness and avoid glare whenever possible.",
      "If you use air conditioning or a fan, avoid direct airflow toward your face."
    ],
    "safety": {
      "intro": "These exercises are designed to relieve mild dryness caused by prolonged screen use or visual fatigue.",
      "when": "Stop the exercises and consult your doctor or eye specialist if you experience:",
      "flags": [
        "Severe eye pain",
        "Sudden loss of vision",
        "Persistent redness or swelling",
        "Eye injury",
        "Thick yellow or green discharge",
        "Dry eyes that do not improve despite regular breaks and hydration"
      ],
      "remember": "These exercises help reduce digital eye strain but are not a substitute for an eye examination if symptoms persist."
    }
  },
  {
    "slug": "wrist-pain",
    "name": "Wrist Pain",
    "aka": null,
    "exercises": [
      {
        "title": "Gentle Wrist Bends",
        "text": "Rest your forearm on a table with your hand hanging over the edge. Slowly bend your wrist up toward the ceiling, then down toward the floor within a comfortable range. Avoid forcing the movement.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Turn Your Palm Up and Down",
        "text": "Keep your elbow close to your body and bent at 90 degrees. Slowly turn your palm to face upward, then downward, while keeping your upper arm still.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Open and Close Your Hand",
        "text": "Open your fingers as wide as you comfortably can, then slowly make a gentle fist without squeezing tightly. Relax and repeat.",
        "dose": "Repetitions: 15–20 times",
        "sec": 45
      },
      {
        "title": "Stretch the Front and Back of Your Wrist",
        "text": "Extend one arm in front of you. Use the opposite hand to gently pull your fingers backward to stretch the front of your forearm, then gently bend the wrist downward to stretch the back. Stretch only until you feel mild tension, not pain.",
        "dose": "Hold: 20–30 seconds × 3 each direction",
        "sec": 90
      },
      {
        "title": "Gentle Grip Strengthening",
        "text": "Hold a soft sponge or stress ball in your hand. Squeeze gently, hold for 3–5 seconds, and slowly release. Do not squeeze hard if it increases your pain.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Keep your wrist in a straight, relaxed position while typing or using a mouse.",
      "Take a 1–2 minute movement break every 30–45 minutes during repetitive work.",
      "Avoid gripping objects too tightly whenever possible.",
      "Alternate hands for repetitive tasks if appropriate.",
      "If the wrist feels sore after activity, reduce the intensity and allow adequate rest before repeating the task."
    ],
    "safety": {
      "intro": "These exercises are intended for mild, non-traumatic wrist discomfort and general stiffness. Perform each movement slowly and only within a comfortable range.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Sudden severe pain after a fall or injury",
        "Increasing swelling or deformity",
        "Persistent numbness or tingling",
        "Loss of hand strength",
        "Pain that continues to worsen despite rest"
      ],
      "remember": "Mild stretching discomfort is acceptable, but sharp pain is not. Progress gradually and focus on smooth, controlled movements rather than force."
    }
  },
  {
    "slug": "shoulder-ache",
    "name": "Shoulder Ache",
    "aka": null,
    "exercises": [
      {
        "title": "Shoulder Pendulum",
        "text": "Lean forward slightly and support yourself with your unaffected arm on a table or chair. Let the painful arm hang relaxed and gently move it in small circles, then forward and backward. Keep the movement relaxed and avoid using force.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      },
      {
        "title": "Wall Finger Walk",
        "text": "Stand facing a wall and slowly \"walk\" your fingers up the wall as high as is comfortable. Pause briefly, then slowly walk your fingers back down.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Arm Raises in Front",
        "text": "Stand or sit upright with your thumb pointing upward. Slowly lift your arm forward to shoulder height or as far as comfortable, then lower it slowly.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Across-the-Body Stretch",
        "text": "Bring one arm across your chest and gently support it with your other hand until you feel a mild stretch at the back of your shoulder. Do not pull forcefully.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      },
      {
        "title": "Shoulder Blade Squeeze",
        "text": "Sit or stand tall with your shoulders relaxed. Gently pull your shoulder blades backward and slightly downward as if trying to hold a pencil between them. Relax slowly.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Keep your shoulders relaxed instead of shrugging them during work.",
      "Avoid lifting heavy objects above shoulder level if it increases your pain.",
      "Change your sitting position regularly and avoid staying in one posture for long periods.",
      "Sleep on your back or on the unaffected side with a pillow supporting the painful arm.",
      "Use a warm pack for muscle stiffness or follow your healthcare professional's advice if your pain is related to a recent injury."
    ],
    "safety": {
      "intro": "These exercises are intended for mild shoulder pain or stiffness and should be performed slowly within a comfortable range.",
      "when": "Stop exercising and seek medical advice if you experience:",
      "flags": [
        "Sudden severe pain after a fall or injury",
        "Inability to lift your arm",
        "Visible swelling or deformity",
        "Persistent numbness or weakness in the arm",
        "Pain that continues to worsen despite rest"
      ],
      "remember": "Mild stretching discomfort is normal, but sharp or severe pain is not. Consistent, gentle movement is generally more beneficial than forcing the shoulder through painful ranges."
    }
  },
  {
    "slug": "tension-headache",
    "name": "Tension Headache",
    "aka": null,
    "exercises": [
      {
        "title": "Pull Your Chin Back",
        "text": "Sit upright and gently pull your chin straight backward without looking up or down, as if making a double chin. Hold for 5 seconds, then relax.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Stretch the Side of Your Neck",
        "text": "Slowly tilt your head toward one shoulder until you feel a gentle stretch on the opposite side of your neck. Keep your shoulders relaxed and avoid lifting them.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Roll Your Shoulders",
        "text": "Sit or stand comfortably and slowly roll your shoulders backward in large circles, then repeat forward. Perform the movement smoothly without rushing.",
        "dose": "Repetitions: 10 circles forward and 10 backward",
        "sec": 45
      },
      {
        "title": "Deep Belly Breathing",
        "text": "Place one hand on your stomach and breathe in slowly through your nose so your stomach rises. Exhale gently through your mouth and allow your shoulders to relax.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Open Your Chest",
        "text": "Stand in a doorway and place your forearms on either side of the door frame. Gently lean your body forward until you feel a comfortable stretch across the front of your chest.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      }
    ],
    "tips": [
      "Take regular breaks from your computer or mobile phone every 30–45 minutes.",
      "Drink enough water throughout the day, as dehydration may contribute to headaches.",
      "Keep your shoulders relaxed and avoid hunching while sitting or working.",
      "Practice slow, deep breathing when you feel stressed or tense.",
      "Aim for a regular sleep routine and avoid prolonged screen use before bedtime."
    ],
    "safety": {
      "intro": "These exercises are intended for mild tension-type headaches related to muscle tightness, posture, or stress. Perform all movements gently and within a comfortable range.",
      "when": "Stop exercising and seek immediate medical attention if you experience:",
      "flags": [
        "A sudden, severe headache unlike any you've had before",
        "Headache after a head injury",
        "Fever, confusion, or neck stiffness",
        "Weakness, numbness, difficulty speaking, or vision changes",
        "Headaches that are frequent, worsening, or do not improve with rest or appropriate treatment"
      ],
      "remember": "Tension headaches often improve with gentle movement, posture correction, hydration, stress management, and adequate sleep. If headaches persist or become severe, consult a healthcare professional for a proper evaluation."
    }
  },
  {
    "slug": "lower-back-pain",
    "name": "Lower Back Pain",
    "aka": null,
    "exercises": [
      {
        "title": "Flatten Your Lower Back",
        "text": "Lie on your back with both knees bent and feet flat on the floor. Gently tighten your stomach muscles and press your lower back into the floor. Hold for 5 seconds, then relax.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Bring One Knee Towards Your Chest",
        "text": "Lie on your back and slowly bring one knee towards your chest using both hands while keeping the other leg bent. Hold comfortably, then switch to the other side.",
        "dose": "Hold: 20–30 seconds × 3 each leg",
        "sec": 90
      },
      {
        "title": "Arch and Round Your Back",
        "text": "Position yourself on your hands and knees. Slowly round your back toward the ceiling, then gently lower your stomach while lifting your head and chest. Move slowly and comfortably.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Lift Your Hips (Bridge Exercise)",
        "text": "Lie on your back with your knees bent and feet shoulder-width apart. Tighten your stomach and buttock muscles, then slowly lift your hips until your shoulders, hips, and knees form a straight line. Lower back down slowly.",
        "dose": "Repetitions: 10–12 times",
        "sec": 45
      },
      {
        "title": "Stretch Your Back and Hips",
        "text": "Sit back onto your heels with your arms stretched forward on the floor and your forehead resting comfortably if possible. Relax into the stretch while breathing slowly.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      }
    ],
    "tips": [
      "Avoid sitting continuously for more than 30–45 minutes. Stand up, stretch, or take a short walk regularly.",
      "When lifting objects, bend your knees and keep the object close to your body instead of bending from your waist.",
      "Maintain good posture while sitting by keeping your back supported and both feet flat on the floor.",
      "Stay physically active with short walks, as prolonged bed rest may delay recovery in many cases of uncomplicated low back pain.",
      "Apply a warm pack for 10–15 minutes if your back feels stiff, unless your healthcare professional has advised otherwise."
    ],
    "safety": {
      "intro": "These exercises are intended for mild, non-specific lower back pain and general stiffness. Perform each movement slowly and stay within a comfortable range.",
      "when": "Stop exercising and seek immediate medical attention if you experience:",
      "flags": [
        "Loss of bladder or bowel control",
        "Numbness around the groin or inner thighs",
        "Severe weakness in one or both legs",
        "Back pain following a major fall or accident",
        "Fever, unexplained weight loss, or constant night pain associated with your back pain",
        "Pain that rapidly worsens or spreads significantly down the leg"
      ],
      "remember": "Mild discomfort while moving can be normal, but sharp or severe pain is not. Gentle, regular movement is generally more beneficial than complete rest. If symptoms persist or worsen, consult a qualified physiotherapist or healthcare professional."
    }
  },
  {
    "slug": "slouching",
    "name": "Slouching",
    "aka": "Poor Sitting Posture",
    "exercises": [
      {
        "title": "Stand Against a Wall",
        "text": "Stand with your back against a wall so that your head, shoulders, and hips gently touch it. Hold this position while keeping your chin level and shoulders relaxed.",
        "dose": "Hold: 20–30 seconds × 5",
        "sec": 120
      },
      {
        "title": "Pull Your Chin Back",
        "text": "Sit or stand tall and gently pull your chin straight backward as if making a double chin. Keep your eyes looking forward and avoid tilting your head.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Squeeze Your Shoulder Blades",
        "text": "Sit or stand upright and gently pull your shoulder blades backward and slightly downward, as if trying to hold a pencil between them. Relax slowly after each squeeze.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      },
      {
        "title": "Open Your Chest",
        "text": "Stand in a doorway and place your forearms on either side of the door frame. Gently lean your body forward until you feel a comfortable stretch across the front of your chest.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      },
      {
        "title": "Stretch Your Upper Back",
        "text": "Sit on a chair with your hands behind your head. Slowly lean your upper back over the backrest of the chair while looking slightly upward, then return to the starting position.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Sit with both feet flat on the floor and keep your hips all the way back in the chair.",
      "Keep your screen at eye level to avoid bending your neck forward.",
      "Stand up, stretch, or walk for 2–3 minutes every 30–45 minutes.",
      "Keep your shoulders relaxed instead of rounded forward.",
      "Strengthen the habit of sitting tall rather than trying to maintain a \"perfect posture\" all day."
    ],
    "safety": {
      "intro": "These exercises are designed to improve posture, reduce muscle stiffness, and promote better spinal alignment. Perform all movements slowly and comfortably without forcing your body into a position.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Severe or worsening back or neck pain",
        "Numbness or tingling in your arms or legs",
        "Loss of balance or dizziness during the exercises",
        "Pain following a recent injury or fall"
      ],
      "remember": "Good posture is about changing positions regularly rather than staying perfectly upright all day. Frequent movement combined with these exercises is often more beneficial than remaining in one position for long periods."
    }
  },
  {
    "slug": "eye-strain",
    "name": "Eye Strain",
    "aka": null,
    "exercises": [
      {
        "title": "Follow the 20-20-20 Rule",
        "text": "Every 20 minutes, look away from your screen and focus on an object about 20 feet (6 meters) away for at least 20 seconds. This helps relax your eye muscles and reduces digital eye strain.",
        "dose": "Frequency: Every 20 minutes",
        "sec": 20
      },
      {
        "title": "Blink Slowly",
        "text": "Close your eyes gently and then open them fully. Repeat slowly to help spread your natural tears over the surface of your eyes and reduce dryness.",
        "dose": "Repetitions: 20 blinks",
        "sec": 45
      },
      {
        "title": "Focus Near and Far",
        "text": "Hold your thumb about an arm's length away and focus on it for 5 seconds. Then look at an object farther away for another 5 seconds before returning your focus to your thumb.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Move Your Eyes in Different Directions",
        "text": "Keeping your head still, slowly look up, down, left, and right. Then move your eyes in gentle circles in both directions.",
        "dose": "Repetitions: 10 times in each direction",
        "sec": 45
      },
      {
        "title": "Relax Your Eyes",
        "text": "Rub your palms together until they feel warm. Close your eyes and gently cup your palms over them without pressing on the eyeballs. Relax and breathe slowly.",
        "dose": "Hold: 30–60 seconds × 3",
        "sec": 120
      }
    ],
    "tips": [
      "Keep your screen about an arm's length away and slightly below eye level.",
      "Adjust your screen brightness to match the room lighting and reduce glare whenever possible.",
      "Blink more often while using digital devices.",
      "Increase the font size instead of leaning closer to the screen.",
      "Take short breaks from screens every hour by standing up and moving around."
    ],
    "safety": {
      "intro": "These exercises are intended to reduce eye fatigue caused by prolonged screen use and are not a treatment for eye diseases.",
      "when": "Stop the exercises and consult an eye care professional if you experience:",
      "flags": [
        "Sudden loss of vision",
        "Severe eye pain",
        "Persistent redness or swelling",
        "Double vision",
        "Flashes of light or new floaters",
        "Eye strain that continues despite regular breaks and proper screen habits"
      ],
      "remember": "Digital eye strain is common and often improves with regular breaks, proper screen positioning, good lighting, and adequate blinking. If symptoms persist or affect your daily activities, seek a comprehensive eye examination."
    }
  },
  {
    "slug": "stiff-fingers",
    "name": "Stiff Fingers",
    "aka": null,
    "exercises": [
      {
        "title": "Open and Close Your Hand",
        "text": "Open your fingers as wide as you comfortably can, then slowly make a gentle fist without squeezing tightly. Relax and repeat to improve finger movement.",
        "dose": "Repetitions: 15–20 times",
        "sec": 45
      },
      {
        "title": "Touch Each Fingertip",
        "text": "Touch the tip of your thumb to the tip of each finger one at a time, making an \"O\" shape. Move slowly and try to reach every finger comfortably.",
        "dose": "Repetitions: 10 rounds",
        "sec": 45
      },
      {
        "title": "Spread Your Fingers Apart",
        "text": "Place your hand flat on a table or hold it in the air. Slowly spread your fingers as far apart as comfortable, then bring them back together.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      },
      {
        "title": "Finger Walking",
        "text": "Place your hand flat on a table and slowly \"walk\" each finger forward and backward one at a time, as if your fingers are taking small steps.",
        "dose": "Repetitions: 10 times with each hand",
        "sec": 45
      },
      {
        "title": "Gentle Grip Strengthening",
        "text": "Squeeze a soft sponge, rolled towel, or stress ball gently. Hold the squeeze for 3–5 seconds and slowly release. Avoid squeezing hard if it causes pain.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Move your fingers regularly if you work on a computer or use your phone for long periods.",
      "Warm your hands before exercising if they feel stiff, especially in cold weather.",
      "Avoid gripping objects too tightly unless necessary.",
      "Stretch and relax your hands every 30–45 minutes during repetitive activities.",
      "Stay hydrated, as healthy muscles and joints function better with adequate hydration."
    ],
    "safety": {
      "intro": "These exercises are intended for mild finger stiffness, reduced flexibility, or discomfort related to overuse. Perform all movements slowly and within a comfortable range.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "A finger that is locked and cannot straighten",
        "Significant swelling, redness, or warmth around the joints",
        "Severe pain after an injury",
        "Persistent numbness or tingling",
        "Difficulty using your hand that continues to worsen"
      ],
      "remember": "Gentle movement performed regularly is often more effective than forceful stretching. If stiffness persists for several weeks or interferes with daily activities, seek assessment by a healthcare professional."
    }
  },
  {
    "slug": "tight-hamstrings",
    "name": "Tight Hamstrings",
    "aka": null,
    "exercises": [
      {
        "title": "Stretch the Back of Your Thigh",
        "text": "Lie on your back and lift one leg. Hold the back of your thigh or use a towel around your foot, then gently straighten your knee until you feel a comfortable stretch behind your thigh.",
        "dose": "Hold: 20–30 seconds × 3 each leg",
        "sec": 90
      },
      {
        "title": "Seated Hamstring Stretch",
        "text": "Sit on the edge of a chair with one leg stretched out in front of you and your heel resting on the floor. Keeping your back straight, gently lean forward from your hips until you feel a stretch behind your thigh.",
        "dose": "Hold: 20–30 seconds × 3 each leg",
        "sec": 90
      },
      {
        "title": "Standing Hamstring Stretch",
        "text": "Place one heel on a low step or stool with your knee slightly bent. Keeping your back straight, slowly lean forward from your hips until you feel a gentle stretch behind your thigh.",
        "dose": "Hold: 20–30 seconds × 3 each leg",
        "sec": 90
      },
      {
        "title": "Gentle Leg Swings",
        "text": "Stand next to a wall or chair for support. Slowly swing one leg forward and backward in a comfortable range while keeping your body upright.",
        "dose": "Repetitions: 15 swings each leg",
        "sec": 45
      },
      {
        "title": "Bridge Exercise",
        "text": "Lie on your back with both knees bent and feet flat on the floor. Tighten your stomach and buttock muscles, then slowly lift your hips until your body forms a straight line from your shoulders to your knees. Lower slowly.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Warm up with a 5–10 minute walk before stretching.",
      "Stretch gently until you feel mild tension, never sharp pain.",
      "Avoid sitting continuously for long periods without standing or walking.",
      "Stretch both legs equally, even if only one feels tight.",
      "Be consistent—small daily stretches are more effective than occasional long sessions."
    ],
    "safety": {
      "intro": "These exercises are designed for mild hamstring tightness and reduced flexibility. Perform each movement slowly and breathe normally throughout.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Sudden sharp pain or a \"popping\" sensation in the back of your thigh",
        "Significant swelling or bruising after an injury",
        "Pain that travels below the knee with numbness or tingling",
        "Difficulty walking due to severe pain",
        "Tightness that does not improve or worsens over time"
      ],
      "remember": "Flexibility improves gradually. Stretching should feel comfortable and controlled, not painful. Regular gentle stretching combined with daily movement usually provides the best results."
    }
  },
  {
    "slug": "tech-neck",
    "name": "Tech Neck",
    "aka": null,
    "exercises": [
      {
        "title": "Pull Your Chin Back",
        "text": "Sit or stand tall and gently pull your chin straight backward, as if making a double chin. Keep your eyes looking forward and avoid tilting your head up or down.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Turn Your Head Side to Side",
        "text": "Slowly turn your head to look over one shoulder, then return to the center and repeat on the other side. Move only within a comfortable range.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      },
      {
        "title": "Open Your Chest",
        "text": "Stand in a doorway and place your forearms on either side of the door frame. Gently lean forward until you feel a comfortable stretch across the front of your chest and shoulders.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      },
      {
        "title": "Squeeze Your Shoulder Blades",
        "text": "Sit or stand upright and gently pull your shoulder blades backward and slightly downward. Hold for 5 seconds before relaxing.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      },
      {
        "title": "Stretch Your Upper Back",
        "text": "Sit on a chair with your hands behind your head. Slowly lean your upper back over the backrest while looking slightly upward, then return to the starting position.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Hold your phone at eye level instead of bending your neck down.",
      "Keep your computer screen at eye height and sit with your back supported.",
      "Take a movement break every 30–45 minutes by standing up and stretching.",
      "Avoid looking down at your phone for long periods without changing position.",
      "Relax your shoulders and avoid hunching while working or using digital devices."
    ],
    "safety": {
      "intro": "These exercises are intended to relieve neck discomfort related to prolonged screen use and poor posture. Perform all movements gently and avoid forcing your neck into painful positions.",
      "when": "Stop exercising and seek medical advice if you experience:",
      "flags": [
        "Pain spreading into your arm with increasing numbness or weakness",
        "Severe neck pain after a fall or accident",
        "Persistent dizziness or loss of balance",
        "Severe headache with vision changes",
        "Symptoms that continue to worsen despite rest and exercise"
      ],
      "remember": "Tech neck usually develops from spending long periods looking down at screens. Small posture changes, regular movement breaks, and gentle exercises performed consistently are often more effective than trying to maintain one perfect posture all day."
    }
  },
  {
    "slug": "fatigue",
    "name": "Fatigue",
    "aka": null,
    "exercises": [
      {
        "title": "Deep Belly Breathing",
        "text": "Sit comfortably and place one hand on your stomach. Take a slow deep breath through your nose, allowing your stomach to rise, then breathe out gently through your mouth.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Gentle Walking",
        "text": "Walk at a comfortable pace for a few minutes while maintaining a relaxed posture. Stop if you feel excessively tired or unwell.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      },
      {
        "title": "Ankle Pumps",
        "text": "While sitting or lying down, slowly point your toes away from you and then pull them back toward you. This helps improve circulation, especially after long periods of sitting or resting.",
        "dose": "Repetitions: 20 times each foot",
        "sec": 45
      },
      {
        "title": "Shoulder Rolls",
        "text": "Sit or stand comfortably and slowly roll your shoulders backward in large circles, then repeat forward. Keep your breathing relaxed throughout the movement.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      },
      {
        "title": "Full Body Stretch",
        "text": "Stand tall and slowly reach both arms overhead as you take a deep breath. Stretch gently through your body, then relax while breathing out.",
        "dose": "Hold: 15–20 seconds × 3",
        "sec": 60
      }
    ],
    "tips": [
      "Drink enough water throughout the day to stay hydrated.",
      "Eat regular, balanced meals and avoid skipping breakfast or lunch.",
      "Take short movement breaks instead of sitting or lying down for long periods.",
      "Aim for 7–9 hours of quality sleep each night.",
      "Pace your activities and take regular rest breaks rather than doing everything at once."
    ],
    "safety": {
      "intro": "These exercises are intended for general tiredness or low energy and should be performed gently. Listen to your body and stop if you feel worse.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Fatigue lasting more than two weeks without improvement",
        "Chest pain, severe shortness of breath, or dizziness",
        "Unexplained weight loss or persistent fever",
        "Extreme weakness that interferes with daily activities",
        "Fatigue following a recent illness that continues to worsen"
      ],
      "remember": "Fatigue can have many causes, including poor sleep, stress, illness, nutrition, or medical conditions. Gentle movement often helps improve energy levels, but persistent or unexplained fatigue should be assessed by a healthcare professional."
    }
  },
  {
    "slug": "limited-rotation",
    "name": "Limited Rotation",
    "aka": "Difficulty Turning Your Body",
    "exercises": [
      {
        "title": "Turn Your Upper Body While Sitting",
        "text": "Sit upright in a chair with your feet flat on the floor. Cross your arms over your chest and slowly turn your upper body to one side as far as comfortable, then return to the center and repeat on the other side.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      },
      {
        "title": "Open Book Stretch",
        "text": "Lie on your side with your knees slightly bent and both arms stretched out in front of you. Slowly lift your top arm and rotate it across your body until you feel a gentle stretch in your chest and upper back, then return to the starting position.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      },
      {
        "title": "Arch and Round Your Back",
        "text": "Position yourself on your hands and knees. Slowly round your back upward, then gently lower your stomach while lifting your head and chest. Move comfortably without forcing the movement.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Turn Your Upper Back",
        "text": "Sit upright with your hands crossed over your chest. Slowly rotate your shoulders and upper body to one side while keeping your hips facing forward, then return to the center and repeat on the opposite side.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      },
      {
        "title": "Reach Across Your Body",
        "text": "Stand comfortably with your feet shoulder-width apart. Reach one arm across your body while gently turning your upper body in the same direction. Return slowly and repeat on the other side.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      }
    ],
    "tips": [
      "Change your sitting position regularly instead of staying in one posture for long periods.",
      "Turn your whole body when reaching behind you instead of twisting suddenly.",
      "Take short walking and stretching breaks every 30–45 minutes.",
      "Warm up your body with a few minutes of gentle walking before stretching.",
      "Move slowly and comfortably—your flexibility will improve gradually with regular practice."
    ],
    "safety": {
      "intro": "These exercises are designed for mild stiffness or reduced movement in the neck, upper back, or trunk. Perform all movements gently and only within a comfortable range.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Sudden severe pain while turning",
        "Pain spreading into your arms or legs",
        "Numbness, tingling, or muscle weakness",
        "Dizziness or loss of balance during movement",
        "Stiffness that continues to worsen or follows a recent injury"
      ],
      "remember": "Mild stiffness often improves with regular movement and stretching. Avoid forcing your body beyond its comfortable range, as gentle and consistent mobility exercises are generally more effective than aggressive stretching."
    }
  },
  {
    "slug": "sore-wrists",
    "name": "Sore Wrists",
    "aka": null,
    "exercises": [
      {
        "title": "Stretch the Front of Your Wrist",
        "text": "Extend one arm straight in front of you with your palm facing upward. Use your other hand to gently pull your fingers downward until you feel a comfortable stretch along the front of your forearm.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Stretch the Back of Your Wrist",
        "text": "Extend one arm with your palm facing downward. Gently bend your wrist downward using your opposite hand until you feel a mild stretch on the top of your forearm.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Open and Close Your Hand",
        "text": "Slowly open your fingers as wide as you comfortably can, then make a gentle fist without squeezing tightly. Relax and repeat.",
        "dose": "Repetitions: 15–20 times",
        "sec": 45
      },
      {
        "title": "Wrist Circles",
        "text": "Keep your elbow close to your body and slowly rotate your wrist in small circles. Perform the movement in both clockwise and anti-clockwise directions.",
        "dose": "Repetitions: 10 circles each direction",
        "sec": 45
      },
      {
        "title": "Gentle Grip Strengthening",
        "text": "Hold a soft sponge, rolled towel, or stress ball and gently squeeze it. Hold for 3–5 seconds before slowly releasing. Avoid squeezing forcefully if it increases your pain.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Keep your wrists in a straight, relaxed position while typing or using your phone.",
      "Take a short movement break every 30–45 minutes during repetitive activities.",
      "Avoid putting excessive pressure on your wrists while getting up from a chair or during exercise.",
      "Use a larger grip on frequently used tools if possible to reduce strain.",
      "If your wrist feels sore after activity, reduce the intensity and allow time to recover before repeating the task."
    ],
    "safety": {
      "intro": "These exercises are designed for mild wrist soreness related to overuse or stiffness. Perform each movement slowly and only within a comfortable range.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Severe pain after a fall or injury",
        "Significant swelling or visible deformity",
        "Persistent numbness or tingling in your hand or fingers",
        "Loss of grip strength or difficulty holding objects",
        "Pain that continues to worsen despite rest"
      ],
      "remember": "Gentle movement and regular breaks are often more effective than complete rest for mild wrist soreness. If your symptoms persist or interfere with daily activities, seek assessment from a qualified healthcare professional."
    }
  },
  {
    "slug": "back-knots",
    "name": "Back Knots",
    "aka": "Upper Back Muscle Tightness",
    "exercises": [
      {
        "title": "Child's Stretch",
        "text": "Kneel on the floor and sit back onto your heels. Reach both arms forward and gently lower your chest toward the floor until you feel a comfortable stretch through your back and shoulders.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      },
      {
        "title": "Open Your Chest",
        "text": "Stand in a doorway and place your forearms on either side of the door frame. Gently lean forward until you feel a comfortable stretch across your chest and the front of your shoulders.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      },
      {
        "title": "Stretch Your Upper Back",
        "text": "Sit on a chair with your hands behind your head. Slowly lean your upper back over the backrest while looking slightly upward, then return to the starting position.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Squeeze Your Shoulder Blades",
        "text": "Sit or stand tall and gently pull your shoulder blades backward and slightly downward. Hold for 5 seconds, then slowly relax.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      },
      {
        "title": "Hug Yourself Stretch",
        "text": "Cross your arms in front of your chest as if giving yourself a hug. Gently reach your hands toward your shoulder blades while rounding your upper back until you feel a stretch between your shoulder blades.",
        "dose": "Hold: 20–30 seconds × 3",
        "sec": 90
      }
    ],
    "tips": [
      "Change your sitting position every 30–45 minutes and avoid staying in one posture for too long.",
      "Apply a warm pack for 10–15 minutes if your muscles feel tight or stiff.",
      "Keep your shoulders relaxed instead of lifting or tensing them during work.",
      "Take short walking and stretching breaks throughout the day.",
      "Stay hydrated, as muscles work best when your body is well hydrated."
    ],
    "safety": {
      "intro": "These exercises are designed for mild muscle tightness and stiffness in the upper back. Perform each movement gently without forcing the stretch.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Severe pain after an injury or fall",
        "Pain spreading into your arms with numbness or weakness",
        "Chest pain, difficulty breathing, or pain unrelated to movement",
        "Fever, unexplained weight loss, or persistent night pain",
        "Muscle tightness that continues to worsen or does not improve over time"
      ],
      "remember": "\"Back knots\" are often caused by muscle tension, prolonged sitting, stress, or poor posture. Gentle movement, regular stretching, and changing positions throughout the day are usually more effective than staying completely still."
    }
  },
  {
    "slug": "brain-fog",
    "name": "Brain Fog",
    "aka": null,
    "exercises": [
      {
        "title": "Deep Belly Breathing",
        "text": "Sit comfortably and place one hand on your stomach. Take a slow deep breath through your nose, allowing your stomach to rise, then breathe out slowly through your mouth. Focus only on your breathing.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Gentle Walk",
        "text": "Take a relaxed walk at a comfortable pace while paying attention to your surroundings and breathing. Gentle movement can help improve alertness and circulation.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      },
      {
        "title": "Neck and Shoulder Relaxation",
        "text": "Sit upright and slowly roll your shoulders backward, then gently turn your head from side to side. Keep the movements slow and comfortable.",
        "dose": "Repetitions: 10 times each movement",
        "sec": 45
      },
      {
        "title": "Eye Relaxation Break",
        "text": "Look away from your screen and focus on an object about 20 feet (6 meters) away for 20 seconds. Then close your eyes for a few seconds before returning to your work.",
        "dose": "Repetitions: Every 20–30 minutes during screen use",
        "sec": 45
      },
      {
        "title": "Sit-to-Stand",
        "text": "Sit on a sturdy chair with your feet flat on the floor. Stand up slowly without using your hands if possible, then sit back down with control.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Drink enough water throughout the day to stay hydrated.",
      "Aim for 7–9 hours of quality sleep each night.",
      "Take regular movement breaks instead of sitting continuously for long periods.",
      "Reduce multitasking and focus on one task at a time.",
      "Eat regular, balanced meals to help maintain your energy levels."
    ],
    "safety": {
      "intro": "These exercises are intended to support general mental alertness and reduce tiredness associated with stress, prolonged sitting, or extended screen use. They are not a treatment for memory disorders or neurological conditions.",
      "when": "Stop exercising and seek medical advice if you experience:",
      "flags": [
        "Sudden confusion or difficulty speaking",
        "Weakness or numbness on one side of the body",
        "Severe dizziness or loss of consciousness",
        "Persistent memory problems that interfere with daily activities",
        "Brain fog lasting several weeks without improvement or associated with other concerning symptoms"
      ],
      "remember": "Brain fog can be influenced by poor sleep, stress, dehydration, illness, medications, nutrition, or other medical conditions. Regular movement, adequate rest, hydration, and healthy daily habits can support mental clarity, but persistent symptoms should be assessed by a healthcare professional."
    }
  },
  {
    "slug": "dry-eyes-2",
    "name": "Dry Eyes",
    "aka": null,
    "exercises": [
      {
        "title": "Blink Slowly and Completely",
        "text": "Sit comfortably and slowly close your eyes, then open them fully. Blinking completely helps spread your natural tears evenly across your eyes and reduces dryness.",
        "dose": "Repetitions: 20 blinks",
        "sec": 45
      },
      {
        "title": "Give Your Eyes a Break",
        "text": "Every 20 minutes, look away from your screen and focus on an object about 20 feet (6 meters) away for at least 20 seconds. This helps relax your eye muscles and reduce digital eye strain.",
        "dose": "Frequency: Every 20 minutes",
        "sec": 20
      },
      {
        "title": "Warm Eye Relaxation",
        "text": "Rub your palms together until they feel warm. Close your eyes and gently cup your palms over them without pressing on your eyes. Relax and breathe normally.",
        "dose": "Hold: 30–60 seconds × 3",
        "sec": 120
      },
      {
        "title": "Move Your Eyes Gently",
        "text": "Keeping your head still, slowly look up, down, left, and right. Then move your eyes in gentle circles in both directions.",
        "dose": "Repetitions: 10 times in each direction",
        "sec": 45
      },
      {
        "title": "Focus Near and Far",
        "text": "Hold your thumb about an arm's length away and focus on it for 5 seconds. Then shift your focus to an object farther away for another 5 seconds before looking back at your thumb.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Blink more often, especially while using digital devices.",
      "Keep your screen slightly below eye level to reduce eye dryness.",
      "Drink enough water throughout the day to stay hydrated.",
      "Reduce screen brightness and avoid glare whenever possible.",
      "Avoid direct air from fans or air conditioners blowing into your eyes."
    ],
    "safety": {
      "intro": "These exercises are designed to help relieve mild dry eyes commonly associated with prolonged screen use or visual fatigue. They are not a substitute for professional eye care.",
      "when": "Stop the exercises and consult an eye care professional if you experience:",
      "flags": [
        "Severe eye pain",
        "Sudden blurred or loss of vision",
        "Persistent redness or swelling",
        "Thick yellow or green eye discharge",
        "Dryness that continues despite regular breaks and hydration"
      ],
      "remember": "Most screen-related dry eyes improve by blinking regularly, taking frequent visual breaks, staying hydrated, and adjusting your screen position. If symptoms persist or become severe, seek a comprehensive eye examination."
    }
  },
  {
    "slug": "numbness",
    "name": "Numbness",
    "aka": "Tingling or Reduced Sensation",
    "exercises": [
      {
        "title": "Gentle Nerve Glide",
        "text": "Sit comfortably with your arm by your side. Slowly straighten your elbow while gently moving your wrist and fingers until you feel a light stretch, then return to the starting position. Do not push into pain or increased tingling.",
        "dose": "Repetitions: 10 times each side",
        "sec": 45
      },
      {
        "title": "Open and Close Your Hands",
        "text": "Slowly spread your fingers as wide as comfortable, then make a gentle fist without squeezing tightly. This helps improve circulation and keeps your joints moving.",
        "dose": "Repetitions: 15–20 times",
        "sec": 45
      },
      {
        "title": "Shoulder Rolls",
        "text": "Sit or stand tall and slowly roll your shoulders backward, then forward. Keep the movements smooth and relaxed.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      },
      {
        "title": "Gentle Neck Movements",
        "text": "Slowly turn your head to look over one shoulder, return to the center, and repeat on the other side. Then gently tilt your head toward each shoulder without forcing the movement.",
        "dose": "Repetitions: 10 times each direction",
        "sec": 45
      },
      {
        "title": "Short Walk",
        "text": "Take a comfortable walk for 5–10 minutes while maintaining good posture and relaxed breathing. Gentle movement helps improve blood circulation and reduces prolonged pressure from sitting.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      }
    ],
    "tips": [
      "Avoid staying in the same position for long periods.",
      "Change your sitting or sleeping position regularly to reduce pressure on nerves.",
      "Maintain good posture while sitting, working, or using digital devices.",
      "Stay physically active with regular movement throughout the day.",
      "Wear comfortable clothing and avoid anything that feels excessively tight around your arms, legs, or waist."
    ],
    "safety": {
      "intro": "These exercises are intended for temporary mild numbness or tingling related to posture, prolonged sitting, or minor muscle tightness. They are not suitable for sudden or severe numbness.",
      "when": "Stop exercising and seek immediate medical attention if you experience:",
      "flags": [
        "Sudden numbness on one side of your body",
        "Difficulty speaking, facial drooping, or vision changes",
        "Loss of bladder or bowel control",
        "Severe weakness in your arm or leg",
        "Numbness after a significant injury or accident",
        "Numbness that continues to worsen or does not improve"
      ],
      "remember": "Mild numbness caused by prolonged pressure often improves with movement and changing position. Persistent or unexplained numbness should always be assessed by a qualified healthcare professional to identify the underlying cause."
    }
  },
  {
    "slug": "anxiety",
    "name": "Anxiety",
    "aka": null,
    "exercises": [
      {
        "title": "Deep Belly Breathing",
        "text": "Sit comfortably and place one hand on your stomach. Breathe in slowly through your nose so your stomach rises, then breathe out gently through your mouth. Focus on making your exhale slightly longer than your inhale.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Shoulder Relaxation",
        "text": "Sit or stand comfortably and slowly lift your shoulders towards your ears, then gently lower them down. Let your shoulders relax completely after each repetition.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Gentle Neck Stretch",
        "text": "Slowly tilt your head toward one shoulder until you feel a gentle stretch on the opposite side of your neck. Keep your shoulders relaxed and breathe normally.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Mindful Walking",
        "text": "Take a slow walk while focusing on your breathing and surroundings. Notice each step, your breathing, and the sounds around you instead of worrying thoughts.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      },
      {
        "title": "Full Body Stretch",
        "text": "Stand tall and slowly reach both arms overhead while taking a deep breath. Stretch gently, then lower your arms as you breathe out and relax your body.",
        "dose": "Repetitions: 5–10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Try to maintain a regular sleep schedule.",
      "Reduce caffeine if it makes you feel more anxious or restless.",
      "Spend a few minutes outdoors or in natural light each day if possible.",
      "Stay connected with family, friends, or someone you trust.",
      "Remember that feeling anxious is common, and gentle movement and slow breathing may help you feel calmer."
    ],
    "safety": {
      "intro": "These exercises are designed to promote relaxation and help reduce everyday stress and mild anxiety. They are not a replacement for professional mental health care.",
      "when": "Stop exercising and seek support from a healthcare professional if:",
      "flags": [
        "Your anxiety frequently interferes with work, school, or daily life",
        "You experience panic attacks repeatedly",
        "You avoid normal activities because of anxiety",
        "Your symptoms continue to worsen despite self-care If you ever feel that you may harm yourself or believe you are in immediate danger, seek emergency medical care or contact your local emergency services immediately"
      ],
      "remember": "Anxiety is a common and treatable condition. Regular physical activity, healthy sleep, relaxation techniques, and professional support when needed can all play an important role in improving your well-being."
    }
  },
  {
    "slug": "burning-eyes",
    "name": "Burning Eyes",
    "aka": null,
    "exercises": [
      {
        "title": "Blink Slowly and Completely",
        "text": "Sit comfortably and slowly close your eyes, then open them fully. Complete blinking helps spread your natural tears over the surface of your eyes and may reduce irritation.",
        "dose": "Repetitions: 20 blinks",
        "sec": 45
      },
      {
        "title": "Rest Your Eyes",
        "text": "Every 20 minutes, look away from your screen and focus on an object about 20 feet (6 meters) away for at least 20 seconds. This helps relax your eye muscles and reduce screen-related discomfort.",
        "dose": "Frequency: Every 20 minutes",
        "sec": 20
      },
      {
        "title": "Warm Eye Relaxation",
        "text": "Rub your palms together until they feel warm. Close your eyes and gently cup your palms over them without applying pressure. Relax and breathe slowly.",
        "dose": "Hold: 30–60 seconds × 3",
        "sec": 120
      },
      {
        "title": "Move Your Eyes Gently",
        "text": "Keeping your head still, slowly move your eyes up, down, left, right, and then in gentle circles. This helps relax the muscles around your eyes after prolonged visual tasks.",
        "dose": "Repetitions: 10 times in each direction",
        "sec": 45
      },
      {
        "title": "Focus Near and Far",
        "text": "Hold your thumb about an arm's length away and focus on it for 5 seconds. Then shift your focus to a distant object for another 5 seconds before returning to your thumb.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Blink more often while reading or using digital devices.",
      "Reduce screen brightness and avoid glare from lights or windows.",
      "Keep your screen slightly below eye level to reduce eye dryness.",
      "Stay hydrated by drinking enough water throughout the day.",
      "If your eyes feel dry, use lubricating eye drops only if recommended by your eye care professional."
    ],
    "safety": {
      "intro": "These exercises are designed to relieve mild burning or irritation associated with prolonged screen use, dry eyes, or visual fatigue. They are not a treatment for eye infections or eye diseases.",
      "when": "Stop the exercises and seek medical attention if you experience:",
      "flags": [
        "Severe or worsening eye pain",
        "Sudden blurred or loss of vision",
        "Redness with swelling or thick discharge",
        "Burning after a chemical exposure or eye injury",
        "Burning that persists despite adequate rest and hydration"
      ],
      "remember": "Burning eyes are commonly related to dry eyes, prolonged screen use, environmental irritants, or fatigue. Regular breaks, frequent blinking, proper hydration, and a comfortable screen setup often help reduce symptoms. If symptoms persist, consult an eye care professional for a comprehensive evaluation."
    }
  },
  {
    "slug": "low-energy",
    "name": "Low Energy",
    "aka": null,
    "exercises": [
      {
        "title": "Gentle Walking",
        "text": "Walk at a comfortable pace while keeping your shoulders relaxed and breathing normally. Even a short walk can help improve circulation and gradually boost your energy.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      },
      {
        "title": "Sit to Stand",
        "text": "Sit on a sturdy chair with your feet flat on the floor. Slowly stand up without using your hands if possible, then sit back down with control.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Full Body Stretch",
        "text": "Stand tall and slowly raise both arms overhead while taking a deep breath. Stretch comfortably, then lower your arms as you breathe out.",
        "dose": "Hold: 15–20 seconds × 3",
        "sec": 60
      },
      {
        "title": "Shoulder Rolls",
        "text": "Sit or stand comfortably and slowly roll your shoulders backward in large circles, then repeat forward. Keep the movements smooth and relaxed.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      },
      {
        "title": "Deep Belly Breathing",
        "text": "Place one hand on your stomach and breathe in slowly through your nose so your stomach rises. Breathe out gently through your mouth and allow your body to relax.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      }
    ],
    "tips": [
      "Start your day with a light walk or gentle stretching.",
      "Drink enough water throughout the day, as dehydration can contribute to low energy.",
      "Eat balanced meals at regular times and avoid skipping meals.",
      "Break long periods of sitting by standing or walking for a few minutes every hour.",
      "Aim for 7–9 hours of quality sleep each night."
    ],
    "safety": {
      "intro": "These exercises are intended to support general low energy and improve daily movement. Perform them at a comfortable pace and rest whenever needed.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Chest pain or pressure",
        "Severe shortness of breath",
        "Dizziness or fainting",
        "Unexplained or persistent fatigue lasting more than two weeks",
        "Fatigue associated with fever, unexplained weight loss, or significant weakness"
      ],
      "remember": "Feeling low on energy can result from poor sleep, stress, dehydration, illness, or reduced physical activity. Gentle movement often helps improve energy levels, but persistent or unexplained symptoms should be evaluated by a healthcare professional."
    }
  },
  {
    "slug": "jaw-tension",
    "name": "Jaw Tension",
    "aka": null,
    "exercises": [
      {
        "title": "Gentle Jaw Opening",
        "text": "Sit comfortably with your shoulders relaxed. Slowly open your mouth as wide as is comfortable without causing pain, then gently close it again.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Tongue on the Roof of Your Mouth",
        "text": "Place the tip of your tongue gently on the roof of your mouth just behind your front teeth. Keeping your tongue in this position, slowly open and close your mouth.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Relax Your Jaw",
        "text": "Allow your lips to stay together while keeping your teeth slightly apart. Take slow deep breaths and consciously relax your jaw muscles without clenching.",
        "dose": "Duration: 1–2 minutes",
        "sec": 60
      },
      {
        "title": "Stretch the Side of Your Neck",
        "text": "Slowly tilt your head toward one shoulder until you feel a gentle stretch on the opposite side of your neck. Keep your shoulders relaxed throughout the movement.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Shoulder Blade Squeeze",
        "text": "Sit or stand upright and gently pull your shoulder blades backward and slightly downward. Hold for 5 seconds before relaxing.",
        "dose": "Repetitions: 15 times",
        "sec": 45
      }
    ],
    "tips": [
      "Keep your teeth slightly apart when you are not eating or speaking.",
      "Avoid chewing gum or biting hard foods if your jaw feels sore.",
      "Try not to clench your jaw during stress or while concentrating.",
      "Apply a warm pack over the jaw muscles for 10–15 minutes if they feel tight.",
      "Maintain good neck and sitting posture, as neck tension can contribute to jaw discomfort."
    ],
    "safety": {
      "intro": "These exercises are intended for mild jaw tightness or muscle tension and should be performed gently without forcing the movement.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "Difficulty opening or closing your mouth",
        "Jaw locking or getting stuck",
        "Significant swelling around the jaw",
        "Severe pain after an injury",
        "Persistent clicking associated with pain or difficulty chewing",
        "Pain that continues to worsen despite rest"
      ],
      "remember": "Jaw tension is often related to stress, teeth clenching, poor posture, or muscle overuse. Gentle relaxation exercises, good posture, and stress management can help reduce symptoms. If jaw pain is persistent or affects eating or speaking, seek assessment from a dentist or healthcare professional."
    }
  },
  {
    "slug": "racing-heart",
    "name": "Racing Heart",
    "aka": "Fast Heartbeat or Palpitations",
    "exercises": [
      {
        "title": "Slow Belly Breathing",
        "text": "Sit comfortably with one hand on your stomach. Breathe in slowly through your nose for 4 seconds, then breathe out gently through your mouth for 6 seconds. Allow your shoulders to relax as you breathe.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Relax Your Shoulders",
        "text": "Sit or stand comfortably and slowly lift your shoulders toward your ears. Gently lower them down and let all the tension melt away.",
        "dose": "Repetitions: 10–15 times",
        "sec": 45
      },
      {
        "title": "Gentle Neck Stretch",
        "text": "Slowly tilt your head toward one shoulder until you feel a gentle stretch on the opposite side of your neck. Keep your breathing slow and your shoulders relaxed.",
        "dose": "Hold: 20–30 seconds × 3 each side",
        "sec": 90
      },
      {
        "title": "Mindful Walking",
        "text": "Take a slow, comfortable walk while focusing on your breathing and surroundings. Walk at a pace that allows you to talk comfortably without becoming breathless.",
        "dose": "Duration: 5–10 minutes",
        "sec": 300
      },
      {
        "title": "Full Body Relaxation Stretch",
        "text": "Stand tall and slowly raise both arms overhead while taking a deep breath. As you breathe out, lower your arms and consciously relax your shoulders, neck, and jaw.",
        "dose": "Repetitions: 5–10 times",
        "sec": 45
      }
    ],
    "tips": [
      "Reduce or avoid excessive caffeine, nicotine, and energy drinks if they trigger your symptoms.",
      "Drink enough water throughout the day, as dehydration can sometimes contribute to palpitations.",
      "Practice slow breathing during stressful situations.",
      "Aim for regular sleep and avoid staying up late.",
      "If your symptoms occur after exercise, stop, rest, and allow your breathing and heart rate to settle before resuming activity."
    ],
    "safety": {
      "intro": "These exercises are intended for people experiencing occasional racing heart associated with stress, anxiety, or temporary fatigue. They are not a treatment for heart disease or abnormal heart rhythms.",
      "when": "Stop exercising and seek immediate medical attention if you experience:",
      "flags": [
        "Chest pain or pressure",
        "Severe shortness of breath",
        "Fainting or feeling like you may faint",
        "A racing heartbeat that lasts for several minutes and does not settle with rest",
        "Palpitations associated with dizziness, confusion, or severe weakness"
      ],
      "remember": "A racing heartbeat can be caused by stress, anxiety, dehydration, caffeine, medications, or underlying heart conditions. If it occurs frequently, without an obvious cause, or is associated with concerning symptoms, it should be evaluated promptly by a healthcare professional."
    }
  },
  {
    "slug": "cold-hands",
    "name": "Cold Hands",
    "aka": null,
    "exercises": [
      {
        "title": "Open and Close Your Hands",
        "text": "Open your fingers as wide as you comfortably can, then slowly make a gentle fist. Repeat the movement to help improve blood circulation to your hands.",
        "dose": "Repetitions: 20 times",
        "sec": 45
      },
      {
        "title": "Wrist Circles",
        "text": "Keep your elbows relaxed by your sides and slowly rotate your wrists in clockwise and anti-clockwise circles. Make the movements smooth and comfortable.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      },
      {
        "title": "Finger Taps",
        "text": "Touch the tip of your thumb to the tip of each finger one at a time. Repeat the sequence slowly to improve finger movement and circulation.",
        "dose": "Repetitions: 10 rounds on each hand",
        "sec": 45
      },
      {
        "title": "Arm Swings",
        "text": "Stand comfortably and gently swing both arms forward and backward in a relaxed rhythm. Allow the movement to be smooth without forcing it.",
        "dose": "Duration: 1–2 minutes",
        "sec": 60
      },
      {
        "title": "Shoulder Rolls",
        "text": "Sit or stand upright and slowly roll your shoulders backward, then forward. Relax your neck and shoulders while breathing normally.",
        "dose": "Repetitions: 10 circles in each direction",
        "sec": 45
      }
    ],
    "tips": [
      "Keep your hands warm by wearing gloves or keeping them in your pockets during cold weather.",
      "Move your fingers and wrists regularly if you work at a desk or remain in one position for a long time.",
      "Stay physically active, as regular movement helps improve circulation throughout your body.",
      "Avoid smoking or nicotine products, as they can reduce blood flow to your hands.",
      "Drink enough water and maintain a balanced diet to support healthy circulation."
    ],
    "safety": {
      "intro": "These exercises are designed to improve circulation and reduce mild coldness in the hands caused by cold weather, inactivity, or prolonged sitting.",
      "when": "Stop exercising and consult a healthcare professional if you experience:",
      "flags": [
        "One hand becoming suddenly cold, pale, or blue",
        "Severe pain or numbness in your fingers",
        "Cold hands associated with chest pain or shortness of breath",
        "Persistent cold hands that interfere with daily activities",
        "Finger color changes (white, blue, then red) occurring repeatedly, especially in cold environments"
      ],
      "remember": "Cold hands are often temporary and improve with warmth and movement. However, persistent cold hands may sometimes be related to circulation, nerve, or medical conditions and should be assessed by a healthcare professional if they continue or worsen."
    }
  },
  {
    "slug": "exhaustion",
    "name": "Exhaustion",
    "aka": null,
    "exercises": [
      {
        "title": "Deep Belly Breathing",
        "text": "Sit or lie down comfortably and place one hand on your stomach. Breathe in slowly through your nose, allowing your stomach to rise, then breathe out gently through your mouth. Focus on slow, relaxed breathing.",
        "dose": "Repetitions: 10 slow breaths",
        "sec": 45
      },
      {
        "title": "Gentle Walking",
        "text": "Take a slow walk at a comfortable pace for a few minutes. Walk only as long as you feel comfortable and stop if you become dizzy, very breathless, or your symptoms worsen.",
        "dose": "Duration: 3–5 minutes",
        "sec": 180
      },
      {
        "title": "Sit-to-Stand",
        "text": "Sit on a sturdy chair with your feet flat on the floor. Slowly stand up, pause for a moment, then sit back down with control. Rest between repetitions if needed.",
        "dose": "Repetitions: 8–10 times",
        "sec": 45
      },
      {
        "title": "Shoulder and Arm Stretch",
        "text": "Sit or stand comfortably and slowly raise both arms overhead while taking a deep breath. Lower your arms gently as you breathe out and relax your shoulders.",
        "dose": "Repetitions: 10 times",
        "sec": 45
      },
      {
        "title": "Ankle Pumps",
        "text": "While sitting or lying down, slowly point your toes away from you and then pull them back toward you. This gentle movement helps improve circulation, especially after prolonged rest.",
        "dose": "Repetitions: 20 times each foot",
        "sec": 45
      }
    ],
    "tips": [
      "Listen to your body and pace your daily activities instead of pushing through severe tiredness.",
      "Drink enough water and eat regular, balanced meals to support your recovery.",
      "Aim for 7–9 hours of quality sleep and take short rest breaks when needed.",
      "Gradually increase your daily activity instead of returning to strenuous exercise too quickly.",
      "If you are recovering from an illness, follow your healthcare professional's advice before resuming intense physical activity."
    ],
    "safety": {
      "intro": "These exercises are designed for general physical exhaustion or tiredness and should be performed gently. Rest whenever needed and avoid overexertion.",
      "when": "Stop exercising and seek immediate medical attention if you experience:",
      "flags": [
        "Chest pain or pressure",
        "Severe shortness of breath",
        "Fainting or loss of consciousness",
        "Confusion or difficulty staying awake",
        "Exhaustion associated with a high fever or severe illness",
        "Extreme tiredness that persists for several weeks or continues to worsen"
      ],
      "remember": "Exhaustion is different from normal tiredness. It may be caused by illness, poor sleep, stress, overtraining, or an underlying medical condition. Gentle movement can support recovery, but persistent or unexplained exhaustion should always be evaluated by a healthcare professional."
    }
  }
];
