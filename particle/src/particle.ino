
#define topLevelPower 7
#define topLevelPin A0

int topLevel = 0;
int bottomLevel = 0;

// This routine runs only once upon reset
void setup()
{
  // Set D7 as an OUTPUT
  pinMode(topLevelPower, OUTPUT);

  // Set to LOW so no power flows through the sensor
  digitalWrite(topLevelPin, LOW);
}

// This routine gets called repeatedly, like once every 5-15 milliseconds.
// Spark firmware interleaves background CPU activity associated with WiFi + Cloud activity with your code.
// Make sure none of your code delays or blocks for too long (like more than 5 seconds), or weird things can happen.
void loop()
{
  topLevel = convertLevel(readTopLevel());
  bottomLevel = topLevel;
  Particle.variable("topLevel", topLevel);
  Particle.variable("bottomLevel", bottomLevel);
  //Particle.variable("data", "{topLevel: " + String(topLevel) + ", bottomLevel: " + String(bottomLevel) + "}");
  delay(10000);
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