
#define bottomLevelPower 7
#define bottomLevelPin A0
#define topLevelPower 6
#define topLevelPin A1

int topLevel = 0;
int bottomLevel = 0;

/** Interval to request the api in seconds */
#define interval 10
/** Time to refill in seconds */
#define refill_timeout 60

// This routine runs only once upon reset
void setup()
{
  // Set D7 as an OUTPUT
  pinMode(bottomLevelPower, OUTPUT);
  pinMode(topLevelPower, OUTPUT);

  // Set to LOW so no power flows through the sensor
  digitalWrite(bottomLevelPin, LOW);
  digitalWrite(topLevelPin, LOW);

  Particle.function("reload", reload);
}

// This routine gets called repeatedly, like once every 5-15 milliseconds.
// Spark firmware interleaves background CPU activity associated with WiFi + Cloud activity with your code.
// Make sure none of your code delays or blocks for too long (like more than 5 seconds), or weird things can happen.
void loop()
{
  bottomLevel = convertLevel(readBottomLevel());
  topLevel = convertLevel(readTopLevel());
  Particle.variable("topLevel", topLevel);
  Particle.variable("bottomLevel", bottomLevel);
  //Particle.variable("data", "{topLevel: " + String(topLevel) + ", bottomLevel: " + String(bottomLevel) + "}");
  delay(interval * 1000);
}

int reload(String extra)
{
  return 0;
}

int readBottomLevel()
{
  digitalWrite(bottomLevelPower, HIGH); // Turn the sensor ON
  delay(10);                            // wait 10 milliseconds
  int val = analogRead(bottomLevelPin); // Read the analog value form sensor
  digitalWrite(bottomLevelPower, LOW);  // Turn the sensor OFF
  return val;                           // send current reading
}

int readTopLevel()
{
  digitalWrite(topLevelPower, HIGH); // Turn the sensor ON
  delay(10);                         // wait 10 milliseconds
  int val = analogRead(topLevelPin); // Read the analog value form sensor
  digitalWrite(topLevelPower, LOW);  // Turn the sensor OFF
  return val;                        // send current reading
}

int convertLevel(int val)
{
  val = (val - 550) / 3;

  if (val < 0)
  {
    val = 0;
  }

  if (val > 100)
  {
    val = 100;
  }

  return val;
}