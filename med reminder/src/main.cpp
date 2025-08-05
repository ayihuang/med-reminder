#include <WiFi.h>
#include <SPIFFS.h>
#include <FS.h>
#include <WebServer.h>
#include <time.h>
#include <secrets.h>

#define SENSOR_PIN 15

WebServer server(80);
int lastState = -1;

void logToCSV(const String &status)
{
  File file = SPIFFS.open("/log.csv", FILE_APPEND);
  if (!file)
  {
    Serial.println("❌ Failed to open file for appending");
    return;
  }

  time_t now;
  struct tm timeinfo;
  time(&now);
  localtime_r(&now, &timeinfo);

  char timestamp[25];
  strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", &timeinfo);

  String line = String(timestamp) + "," + status + "\n";
  file.print(line);
  file.close();

  Serial.print("✅ Logged: ");
  Serial.println(line);
}

void handleDownload()
{
  File file = SPIFFS.open("/log.csv", "r");
  if (!file)
  {
    server.send(500, "text/plain", "Failed to open file");
    return;
  }

  server.sendHeader("Content-Type", "text/csv");
  server.sendHeader("Content-Disposition", "attachment; filename=log.csv");
  server.sendHeader("Connection", "close");
  server.streamFile(file, "text/csv");
  file.close();
}

void setup()
{
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT_PULLUP);

  if (!SPIFFS.begin(true))
  {
    Serial.println("❌ Failed to mount SPIFFS");
    return;
  }
  Serial.println("✅ SPIFFS mounted");

  WiFi.disconnect(true);
  delay(1000);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting t2o WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n✅ WiFi connected");
  Serial.println(WiFi.localIP());

  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("❌ Failed to obtain time");
  }
  else
  {
    Serial.println("✅ Time synchronized");
  }

  server.on("/log.csv", HTTP_GET, handleDownload);
  server.begin();
  Serial.println("📡 HTTP server started");
}

void loop()
{
  server.handleClient();

  int currentState = digitalRead(SENSOR_PIN);
  if (currentState != lastState)
  {
    lastState = currentState;
    String status = (currentState == LOW) ? "BOX_OPENED" : "BOX_CLOSED";
    logToCSV(status);
    delay(200); // debounce
  }

  delay(100);
}
