/**
 * Siden det er lite variasjon med temperatursensor så kan en istedenfor å multiplisere et tall med en faktor overføre den til en annen skala med map-funksjonen.
 * 
 * Valgte verdier her gir frekvensen 20 Hz ved -5 grader, ca 950 Hz ved 15 grader som fortsatt er kladt
 * 
 * og opp til 1480 Hz ved 27 grader, som begynner å bli varmt. Maks verdi er 2550 Hz
 * 
 * Variablene sensorverdi_raw og sensorverdi_map viser disse verdiene.
 * 
 * A og B - tastene brukes til å bytte mellom to visninger.
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
        basic.showNumber(sensorverdi_raw)
        OLED.writeNum(sensorverdi_raw)
        OLED.newLine()
    } else {
        // Microbit kan kun vise et tall / tegn av gange, men å vise tal med f.eks. tone er en metode som ofte brukes for å vise et tall. Avstandssenorer kan blant annet bruke slik varsling. Bytt gjerne ut _raw med _map. Da kan en se verdiene som er benyttet i IF-testene
        basic.showNumber(sensorverdi_map)
        OLED.writeNum(sensorverdi_map)
        OLED.newLine()
    }
    music.playTone(sensorverdi_map, music.beat(BeatFraction.Sixteenth))
})
