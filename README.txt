Dette er en brugermanual til selve appen/backoffice skridt for skridt.
1. Opdatatere projektet ved brug af npm install.
2. Kør byggemarked.sql(i din database) filen som ligger under models.
3. Kør vare.sql filen som ligger under models. Denne fil tilføjer vare til databasen.
4. Kør updateVareundergruppe.sql filen som ligger under models. Denne fil opdatere vareundergruppe med billeder.

Nu kan programmet køre og der er oprettet følgende fra databasen i forvejen:
1. En bruger med brugernavn test@gmail.com med adgangskode 1. Denne profil kan ses bortfra såfremt der ønskes at oprette sin egen fil.
2. Backoffice ligger lige nu åben uden restriktioner. Det eneste der skal til er: /backoffice i url.
3. Når man tilgår appen er det nødvendigt at være logget ind for at bruge disse, da vi bruger middelware til at tjekke om brugeren er logget ind fra routeren =)

Vigitgt!
Selve appen er predefineret på nogle punkter da det er en prototype. Derfor bedes på forhånd de givne vare i databasen ikke blive rettet på deres varenummer.