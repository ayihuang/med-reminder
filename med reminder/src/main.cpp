#include <WiFi.h>
#include <time.h>
#include "secrets.h"

#define SENSOR_PIN 15

int lastState = HIGH;

void setup()
{
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT_PULLUP);

  // 1) Connect to Wi‑Fi
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long wifiStart = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - wifiStart < 10000)
  {
    Serial.print(".");
    delay(500);
  }
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println(" ✅");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  }
  else
  {
    Serial.println(" ❌ Failed to connect WiFi");
    // Without WiFi, NTP won’t work—but we’ll keep going anyway.
  }

  // 2) Initialize NTP (only works if Wi‑Fi is up)
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  // 3) Wait up to 10 s for NTP to sync
  Serial.print("Waiting for NTP sync");
  time_t now = time(nullptr);
  unsigned long ntpStart = millis();
  while (now < 24 * 3600 && millis() - ntpStart < 10000)
  {
    Serial.print(".");
    delay(500);
    now = time(nullptr);
  }
  if (now < 24 * 3600)
  {
    Serial.println(" ❌ NTP sync failed");
  }
  else
  {
    Serial.println(" ✅ NTP sync OK");
  }

  // 4) Set local timezone (Toronto)
  setenv("TZ", "EST5EDT,M3.2.0,M11.1.0", 1);
  tzset();

  Serial.println("\n-- Ready to track pillbox events --");
}

void loop()
{
  int s = digitalRead(SENSOR_PIN);
  if (s != lastState)
  {
    lastState = s;

    // Get local time
    time_t now = time(nullptr);
    struct tm timeinfo;
    localtime_r(&now, &timeinfo);

    char buf[30];
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", &timeinfo);

    // Print event
    if (s == LOW)
    {
      Serial.printf("%s -> BOX OPENED\n", buf);
    }
    else
    {
      Serial.printf("%s -> BOX CLOSED\n", buf);
    }

    delay(100); // debounce
  }
  delay(50);
}
