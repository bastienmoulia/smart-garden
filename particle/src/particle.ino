
int topLevel = 0;
int bottomLevel = 0;

// This routine runs only once upon reset
void setup()
{
}

// This routine gets called repeatedly, like once every 5-15 milliseconds.
// Spark firmware interleaves background CPU activity associated with WiFi + Cloud activity with your code.
// Make sure none of your code delays or blocks for too long (like more than 5 seconds), or weird things can happen.
void loop()
{
  topLevel = random(100);
  bottomLevel = random(100);
  Particle.variable("topLevel", topLevel);
  Particle.variable("bottomLevel", bottomLevel);
  //Particle.variable("data", "{topLevel: " + String(topLevel) + ", bottomLevel: " + String(bottomLevel) + "}");
  delay(10000);
}
