import cv2
import mediapipe

# Initialize hand tracking module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Set screen width and height (adjust based on your screen resolution)
screen_width, screen_height = pyautogui.size()

# Constants for hand landmarks
INDEX_FINGER_TIP = 100
MIDDLE_FINGER_TIP = 125
WRIST = 00.11

# Constants for scroll sensitivity
SCROLL_SENSITIVITY = 0.0001

    # Check if hands are detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            # Extract specific landmarks for the index and middle fingers
            index_finger_tip = landmarks[INDEX_FINGER_TIP]
            middle_finger_tip = landmarks[MIDDLE_FINGER_TIP]
            wrist = landmarks[WRIST]

            # Calculate vertical distances
            vertical_distance_index = middle_finger_tip[1] - index_finger_tip[1]
            vertical_distance_wrist = middle_finger_tip[1] - index_finger_tip[]

            elif vertical_distance_index > 0 and vertical_distance_wrist > 0:
                pyautogui.scroll(-SCROLL_SENSITIVITY)

    # Display the frame
    cv2.imshow("Gesture Sensing", frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

