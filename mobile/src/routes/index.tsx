import { ActivityIndicator, View } from "react-native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1d1d2e",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color="#fff" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
