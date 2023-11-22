#include <Wire.h> 
#include <LiquidCrystal_I2C.h>


LiquidCrystal_I2C lcd(0x27,16,2);

int water_pin = A0;      //수분수위센서 A0에 연결
int LED1 = 2;            // LED를 각각 디지털핀 2,3,4에 연결
int LED2 = 3;
int LED3 = 4;

#define FLOWSENSORPIN 6                     // 핀 번호 설정
volatile uint16_t pulses = 0;               // 데이터 유형 설정
volatile uint8_t lastflowpinstate;
volatile uint32_t lastflowratetimer = 0;
volatile float flowrate;

SIGNAL(TIMER0_COMPA_vect) {
  uint8_t x = digitalRead(FLOWSENSORPIN);   // 유량측정센서 값을 디지털로 읽음
  if (x == lastflowpinstate) {
    lastflowratetimer++;
    return;
  }
  if (x == HIGH) {                          // x값이 들어오면 pulse값을 1 증가시킴
    pulses++;
  }
  lastflowpinstate = x;
  flowrate = 1000.0;
  flowrate /= lastflowratetimer;
  lastflowratetimer = 0;
}

void useInterrupt(boolean v) {             // bool값에 따른 출력 설정
  if (v) {
    OCR0A = 0xAF;
    TIMSK0 |= _BV(OCIE0A);
  } else {
    TIMSK0 &= ~_BV(OCIE0A);
  }
}

void judgeFlowrate(){
  if (flowrate >= 10) {
    lcd.setCursor(0,1);
    lcd.print("Dangerous!");
    }
}

void printReadWaterLevel(int waterLevel){
  lcd.setCursor(13,0);
  lcd.print(waterLevel); 
}

void printLed(int red, int yellow, int white){
  digitalWrite( 2, red);
  digitalWrite( 3, yellow);
  digitalWrite( 4, white);
}

void setup() {
  Serial.begin(9600);   // Serial monitor 구동 전원입력

  lcd.init();
  lcd.backlight();    

  pinMode( A0,   INPUT); // A0핀을 입력으로 설정
  pinMode( 2,   OUTPUT); // 디지털핀 2,3,4를 출력으로 설정
  pinMode( 3,   OUTPUT);
  pinMode( 4,   OUTPUT);

  pinMode(FLOWSENSORPIN, INPUT);
  digitalWrite(FLOWSENSORPIN, HIGH);
  lastflowpinstate = digitalRead(FLOWSENSORPIN);
  useInterrupt(true);
}
void loop(){
  int readWaterLevel = analogRead(A0);

  Serial.print("유량센서: "); Serial.print(flowrate); Serial.print(" 수위센서:  ");
  Serial.println(analogRead(A0));  // Serial monitor로 A0값을 보여줌

  lcd.setCursor(0,0);
  lcd.print("Water Level: ");  
  delay(500);                       // 입력값을 보여주는데 0.5초 설정
  lcd.clear();

  if(analogRead(A0) < 600){         // A0가 600이하면 모든 LED OFF
    printLed(0,0,0);
    printReadWaterLevel(readWaterLevel);
    delay(500);
  }
   
   else if( 550 < analogRead(A0) && analogRead(A0) <= 650 ){
    printLed(1,0,0);           // 600<A0<700이면 빨간 LED ON
    printReadWaterLevel(readWaterLevel);
    judgeFlowrate();
    delay(500);                      //수위센서 1/5 임박
  }
   else if( 650 < analogRead(A0) && analogRead(A0) <= 750){
    printLed(1,1,0);            // 700<A0<800이면 빨,노 LED ON
    printReadWaterLevel(readWaterLevel);
    judgeFlowrate();
    delay(500);                       //수위센서의 1/3 
  }
   else {
    printLed(1,1,1);
    printReadWaterLevel(readWaterLevel);
    judgeFlowrate();
    delay(500);                        // A0<800이면 빨,노,흰 LED ON
  }                                   //수위센서 1/3 넘을때 
}