import cv2
import mediapipe as mp
import pyautogui

# Initialize hand tracking module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Open the video capture device (0 is usually the default webcam)
cap = cv2.VideoCapture(0)

# Set screen width and height (adjust based on your screen resolution)
screen_width, screen_height = pyautogui.size()

# Constants for hand landmarks
INDEX_FINGER_TIP = 8
MIDDLE_FINGER_TIP = 12
WRIST = 0

# Constants for scroll sensitivity
SCROLL_SENSITIVITY = 12

index_y = 0  # Added for storing index finger y-coordinate

while True:
    # Read the current frame
    _, frame = cap.read()

    # Flip the frame horizontally for a later selfie-view display
    frame = cv2.flip(frame, 1)

    # Find hands in the frame
    results =hands.process(frame)

    # Check if hands are detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Extract landmarks
            landmarks = [(lm.x * screen_width, lm.y * screen_height) for lm in hand_landmarks.landmark]

            # Extract specific landmarks for the index and middle fingers
            index_finger_tip = landmarks[INDEX_FINGER_TIP]
            middle_finger_tip = landmarks[MIDDLE_FINGER_TIP]
            wrist = landmarks[WRIST]

            # Calculate vertical distances
            vertical_distance_index = middle_finger_tip[1] - index_finger_tip[1]
            vertical_distance_wrist = middle_finger_tip[1] - index_finger_tip[1]

            # Scroll up
            if vertical_distance_index < 0 and vertical_distance_wrist < 0:
                pyautogui.scroll(SCROLL_SENSITIVITY)

            # Scroll down
            elif vertical_distance_index > 0 and vertical_distance_wrist > 0:
                pyautogui.scroll(-SCROLL_SENSITIVITY)

            # Additional functionality from the first code
            # (Adjust these lines based on your requirements)
            index_y = index_finger_tip[1]
            thumb_y = middle_finger_tip[1]
            if abs(index_y - thumb_y) < 20:
                pyautogui.click()
                pyautogui.sleep(1)
            elif abs(index_y - thumb_y) < 100:
                pyautogui.moveTo(index_finger_tip[0], index_finger_tip[1])

    # Display the frame
    cv2.imshow("Gesture Sensing", frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture device and close windows
cap.release()
cv2.destroyAllWindows()
