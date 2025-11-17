// import React, { useEffect, useRef } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { Animated, Text, View } from "react-native";

// interface ToastProps {
//   message: string;
//   type?: "success" | "error" | "info";
//   visible: boolean;
//   onHide: () => void;
//   duration?: number;
// }

// export function Toast({
//   message,
//   type = "info",
//   visible,
//   onHide,
//   duration = 3000,
// }: ToastProps) {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(-28)).current;

//   useEffect(() => {
//     if (visible) {
//       opacity.setValue(0);
//       translateY.setValue(-28);
//       Animated.parallel([
//         Animated.timing(opacity, {
//           toValue: 1,
//           duration: 260,
//           useNativeDriver: true,
//         }),
//         Animated.spring(translateY, {
//           toValue: 0,
//           tension: 50,
//           friction: 8,
//           useNativeDriver: true,
//         }),
//       ]).start();

//       const timer = setTimeout(() => {
//         Animated.parallel([
//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 220,
//             useNativeDriver: true,
//           }),
//           Animated.timing(translateY, {
//             toValue: -28,
//             duration: 220,
//             useNativeDriver: true,
//           }),
//         ]).start(() => {
//           onHide();
//         });
//       }, duration);

//       return () => clearTimeout(timer);
//     }
//   }, [visible, duration, onHide, opacity, translateY]);

//   if (!visible) return null;

//   const bgColor =
//     type === "success"
//       ? "#16a34a"
//       : type === "error"
//       ? "#dc2626"
//       : "#1e40af";

//   const iconName =
//     type === "success"
//       ? "checkmark-circle"
//       : type === "error"
//       ? "close-circle"
//       : "information-circle";

//   return (
//     <Animated.View
//       style={{
//         opacity,
//         transform: [{ translateY }],
//         position: "absolute",
//         left: 16,
//         right: 16,
//         top: 18,
//         zIndex: 9999,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: bgColor,
//           borderRadius: 14,
//           paddingVertical: 12,
//           paddingHorizontal: 14,
//           shadowColor: "#000",
//           shadowOpacity: 0.12,
//           shadowRadius: 18,
//           elevation: 8,
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <Ionicons name={iconName as any} size={22} color="white" />
//         <Text style={{ color: "white", fontWeight: "600", marginLeft: 12, flex: 1 }}>
//           {message}
//         </Text>
//       </View>
//     </Animated.View>
//   );
// }
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Animated } from "react-native";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({
  message,
  type,
  visible,
  onHide,
  duration = 3000,
}: ToastProps) {
  const [hasShown, setHasShown] = React.useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      setHasShown(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide, opacity, translateY]);

  if (!visible && !hasShown) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={24} color="white" />;
      case "error":
        return <Ionicons name="close-circle" size={24} color="white" />;
      case "info":
        return <Ionicons name="information-circle" size={24} color="white" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "info":
        return "#3b82f6";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        {getIcon()}
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },
});