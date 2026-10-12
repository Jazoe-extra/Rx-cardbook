import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cardbook.app",
  appName: "Cardbook",
  webDir: "android-web",
  android: {
    allowMixedContent: false
  }
};

export default config;
