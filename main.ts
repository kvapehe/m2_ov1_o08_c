/**
 * Siden det er lite accelerometeret i mg-instilling er litt tung å ha med å gjøre. Valgte derfor å droppe vising med Mbit, både symboler og tall.
 * 
 * Med et OLED-display gan verdier vises. NB MAP er ikke med fornuftige verdier med tanke på lyd eller vinsg av verdier.
 * 
 * Siden måler er i mg-modus kan en anta en må trykke på en elektronisk komponent
 * 
 * for å måle ulig strength, men en kan også hive Microbit av gårde og få ulike målinger. Lyden er gjort svært kort for å ikke plage for mye, men det er ulike frekvenser.
 * 
 * A og B - tastene brukes til å bytte mellom to visninger, men kun på OLED
 * 
 * dersom en har slikt display tilgjengelig.
 */
input.onButtonPressed(Button.A, function () {
    debug = 0
})
input.onButtonPressed(Button.B, function () {
    debug = 1
})
let sensorverdi_map = 0
let sensorverdi_raw = 0
let debug = 0
debug = 0
OLED.init(128, 64)
basic.forever(function () {
    sensorverdi_raw = input.acceleration(Dimension.Strength)
    sensorverdi_map = Math.map(sensorverdi_raw, -5, 50, 20, 2550)
    if (debug == 0) {
        OLED.writeNum(sensorverdi_raw)
        OLED.newLine()
    } else {
        OLED.writeNum(sensorverdi_map)
        OLED.newLine()
    }
    basic.pause(40)
    music.playTone(sensorverdi_raw, music.beat(BeatFraction.Eighth))
})
