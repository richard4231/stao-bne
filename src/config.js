// =========================================================
        // FRAGENKATALOG - BEGINN
        // =========================================================
        // Anleitung zum Hinzufügen oder Bearbeiten von Fragen:
        // 1. Jede Frage hat eine eindeutige ID
        // 2. Die ID folgt dem Schema: <Bereichsnummer><laufende Nummer>
        //    z.B. 11, 12, 13 für Fragen im ersten Bereich
        // 3. Struktur jeder Frage:
        //    - id: Eindeutige Nummer der Frage
        //    - text: Der Fragetext
        //    - bereich: Einer der Bereiche aus der BEREICHE-Konstante
        //    - ebene: "subjektiv", "objektiv" oder "interesse"
        //    - typ: "slider" oder "mc" (Multiple Choice)
        //    - antworten: Array mit Antwortmöglichkeiten
        //      * text: Beschreibung der Antwort
        //      * wert: Punktwert (0-3)
        
        // Konfiguration
 
        const BEREICHE = [
            "Lehrperson: Wissen", 
            "Lehrperson: Bewusstsein",
            "Lehrperson: Handeln",
            "Unterricht: Prinzipien",
            "Unterricht: Kompetenzen",
            "Unterricht: Themen",
            "Unterricht: Methoden",
            "Schule: Schulentwicklung",
        ];

        // Liste der Studienfächer
        const STUDIENFAECHER = [
            "D", "F", "M", "NT", "RZG", "WAH", "ERG", 
            "E", "BS", "BG", "TTG", "MU", "I", "RR", "L"
        ];

        // Fächerbeschreibungen für Tooltip oder erweiterte Anzeige
        const FACH_BESCHREIBUNGEN = {
            "D": "Deutsch",
            "F": "Französisch",
            "M": "Mathematik",
            "NT": "Natur & Technik",
            "RZG": "Räume, Zeiten, Gesellschaften",
            "WAH": "Wirtschaft, Arbeit, Haushalt",
            "ERG": "Ethik, Religionen, Gemeinschaft",
            "E": "Englisch",
            "BS": "Bewegung und Sport",
            "BG": "Bildnerisches Gestalten",
            "TTG": "Textiles und Technisches Gestalten",
            "MU": "Musik",
            "I": "Italienisch",
            "RR": "Rätoromanisch",
            "L": "Latein"
        };
        
        // Liste der Lerngelegenheiten
        const LERNGELEGENHEITEN = [
            {
                id: "bne_intro",
                semester: "HS",
                kategorie: "Persönliche und professionelle Entwicklung",
                titel: "Einführung BNE an der PHBern"
            },
            {
                id: "bne_lehrplan",
                semester: "HS & FS",
                kategorie: "Mikro- / Makroplanung",
                titel: "Bildung für Nachhaltige Entwicklung im Lehrplan"
            },
            {
                id: "zukunftskompetenzen",
                semester: "HS & FS",
                kategorie: "Beratung & Begleitung",
                titel: "Zukunftskompetenzen"
            },
            {
                id: "partizipativ",
                semester: "HS & FS",
                kategorie: "Zusammenarbeit & Kommunikation",
                titel: "Schule partizipativ gestalten"
            },
            {
                id: "bne_konzept",
                semester: "HS & FS",
                kategorie: "Persönliche und professionelle Entwicklung",
                titel: "Persönliches BNE-Konzept … hä?"
            },
            {
                id: "achtsamkeit",
                semester: "HS",
                kategorie: "Klassenführung",
                titel: "Sozio-emotionales Lernen & Beziehungsgestaltung – Achtsamkeit in der Schule"
            },
            {
                id: "heterogenitaet",
                semester: "HS",
                kategorie: "Klassenführung",
                titel: "Heterogenität im Klassenzimmer – mögliche Diagnosen und der Umgang damit"
            },
            {
                id: "wah_fachverstaendnis",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität WAH",
                titel: "Fach- und Bildungsverständnis WAH"
            },
            {
                id: "konsum_nachhaltigkeit",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität WAH",
                titel: "Lebensführung, Konsum und Nachhaltigkeit"
            },
            {
                id: "wirtschaft_gesellschaft",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität WAH",
                titel: "Wirtschaft und Gesellschaft"
            },
            {
                id: "rzg_fachverstaendnis",
                semester: "HS & FS",
                kategorie: "Fachkompetenz RZG",
                titel: "Fachverständnis RZG"
            },
            {
                id: "globale_herausforderungen",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität RZG",
                titel: "Globale Herausforderungen & lokal Brennpunkte"
            },
            {
                id: "alpen",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität RZG",
                titel: "Dynamische Alpen"
            },
            {
                id: "menschenrechte",
                semester: "HS & FS",
                kategorie: "Fachkompetenz & Mehrperspektivität RZG",
                titel: "Menschenrechte im Klassenzimmer"
            },
            {
                id: "kunst_zugaenge",
                semester: "FS",
                kategorie: "Mikroplanung BG / Klassenführung BG",
                titel: "Rezeptive Zugänge zur Bildenden Kunst und zu Bildwelten des Alltags"
            }
        ];

        const FRAGEN = [
            // Lehrperson: Wissen Nummerierung: 1x
            {
                id: 11,
                text: "Wie gut kennen Sie sich mit den SDG aus?",
                bereich: "Lehrperson: Wissen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig oder grundlegend", wert: 1 },
                    { text: "Fortgeschritten", wert: 2 },
                    { text: "Hohe Expertise", wert: 3 }
                ]
            },
            {
                id: 12,
                text: "Zu welcher Umsetzungsstrategie von Nachhaltigkeit passt die folgende Definition: «Weniger produzieren und konsumieren: Energie- und Materialverbrauch begrenzen. Beispiel: Vom Besitzen zum Teilen»",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Suffizienz", wert: 3 }, // korrekte Antwort
                    { text: "Konsistenz", wert: 1 },
                    { text: "Effizienz", wert: 1 }, 
                ]
            },
            {
                id: 13,
                text: "Wie stark interessieren Sie sich für die SDG?",
                bereich: "Lehrperson: Wissen",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Gering", wert: 1 },
                    { text: "Mittel", wert: 2 },
                    { text: "Hoch", wert: 3 }
                ]
            },
            {
                id: 14,
                text: "Um mein Unterricht zielorientierter gestalten zu können, möchte ich noch mehr über die Leitidee von Nachhaltiger Entwicklung und die Ziele einer BNE erfahren.",
                bereich: "Lehrperson: Wissen",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Trifft eher nicht zu", wert: 1 },
                    { text: "Trifft eher zu", wert: 2 },
                    { text: "Trifft zu", wert: 3 }
                ]
            },
            {
                id: 15,
                text: "Der Lehrplan 21 bezieht sich auf das «Drei-Dimensionen-Modell der Nachhaltigen Entwicklung». Welche ist keine der drei Dimensionen?",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Gesellschaft", wert: 1 },
                    { text: "Umwelt", wert: 1 },
                    { text: "Soziales", wert: 3 }, // korrekte Antwort
                    { text: "Wirtschaft", wert: 1 }
                ]
            },
            {
                id: 16,
                text: "Ist die Förderung einer Nachhaltigen Entwicklung in der Schweizerischen Bundesverfassung als Auftrag staatlichen Handelns festgeschrieben?",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 3 }, // korrekte Antwort
                    { text: "Nein", wert: 1 }
                ]
            },
            {
                id: 17,
                text: "Im BNE-Unterricht gibt es verschiedene normative Rahmen. Um welchen Ansatz handelt es sich bei: Vermittlung von Expertenwissen, Förderung nachhaltigen Verhaltens und Lernen für eine nachhaltige Entwicklung?",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Instrumenteller Ansatz", wert: 3 }, // korrekte Antwort
                    { text: "Emanzipatorischer Ansatz", wert: 1 },
                    { text: "Transformativer Ansatz", wert: 1 }
                ]
            },
            {
                id: 18,
                text: "Im BNE-Unterricht gibt es verschiedene normative Rahmen. Um welchen Ansatz handelt es sich bei: Widersprüche (dialektisch) überwinden, nicht-Vorhersehbarkeit, Emotionen, Lernen durch nachhaltige Entwicklung?",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Instrumenteller Ansatz", wert: 1 },
                    { text: "Emanzipatorischer Ansatz", wert: 1 },
                    { text: "Transformativer Ansatz", wert: 3 } // korrekte Antwort
                ]
            },
            {
                id: 19,
                text: "Welche Gefahr besteht primär bei einem emanzipatorischen Ansatz im BNE-Unterricht?",
                bereich: "Lehrperson: Wissen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Gefahr der Indoktrination", wert: 1 },
                    { text: "Gefahr des Zeitmangels", wert: 3 } // korrekte Antwort
                ]
            },
            // Lehrperson: Bewusstsein id 2x
            {
                id: 21,
                text: "Ich fühle mich sicher, wie ich im BNE-Unterricht meinen Standpunkt und meine Meinung vertreten darf und kann.",
                bereich: "Lehrperson: Bewusstsein",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Trifft nicht zu", wert: 1 },
                    { text: "Trifft eher zu", wert: 2 },
                    { text: "Trifft zu", wert: 3 }
                ]
            },
            {
                id: 22,
                text: "Ich möchte mehr über den Beutelsbacher Konsens erfahren und mich mit der Umsetzung von BNE im Unterricht auseinandersetzen",
                bereich: "Lehrperson: Bewusstsein",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Trifft eher nicht zu", wert: 1 },
                    { text: "Trifft eher zu", wert: 2 },
                    { text: "Trifft sehr zu", wert: 3 }
                ]
            },
            {
                id: 23,
                text: "Der Beutelsbacher Konsens besagt, dass sich Lehrpersonen im Unterricht nicht zu politisch heiklen Themen äussern sollten.",
                bereich: "Lehrperson: Bewusstsein",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Richtig", wert: 1 },
                    { text: "Falsch", wert: 3 }, // korrekte Antwort
                    { text: "Teilweise richtig", wert: 1 },
                ]
            },
            {
                id: 24,
                text: "Ich kann mich gut zu den Zielen einer (B)NE positionieren und habe eine klare Haltung zu dem aktuellen Diskurs.",
                bereich: "Lehrperson: Bewusstsein",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Trifft nicht zu", wert: 1 },
                    { text: "Trifft eher zu", wert: 2 },
                    { text: "Trifft zu", wert: 3 }
                ]
            },
            {
                id: 25,
                text: "Ich fühle mich noch nicht sicher, wie ich im BNE-Unterricht meinen Standpunkt und meine Meinung vertreten kann. Ich möchte deshalb noch mehr darüber erfahren, was im BNE-Unterricht erwünscht, und was verboten ist.",
                bereich: "Lehrperson: Bewusstsein",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Trifft nicht zu", wert: 1 },
                    { text: "Trifft teilweise zu", wert: 2 },
                    { text: "Trifft zu", wert: 3 }
                ]
            },

            // Lehrperson: Handeln id 3x
            {
                id: 31,
                text: "Wie stark beschäftigt Sie die Frage, wie Ihr Handeln als Lehrperson das Lernen der Schüler*innen in Bezug auf BNE beeinflusst?",
                bereich: "Lehrperson: Handeln",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig", wert: 1 },
                    { text: "Mittel", wert: 2 },
                    { text: "Stark", wert: 3 }
                ]
            },
            {
                id: 32,
                text: "Die lernförderlichen Gelegenheiten werden im Rahmen der Agenda 2030 zusammen mit den Schlüsselkompetenzen einer BNE als wichtig erachtet.",
                bereich: "Lehrperson: Handeln",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Richtig", wert: 3 }, // korrekte Antwort
                    { text: "Falsch", wert: 1 }, 
                   
                ]
            },
            {
                id: 33,
                text: "Der Whole Institution Approach (WIA) zeigt Möglichkeiten auf, wie BNE in der Schule ohne Einbezug von ausserschulischen Akteur:innen umgesetzt werden kann.",
                bereich: "Lehrperson: Handeln",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Richtig", wert: 1 }, 
                    { text: "Falsch", wert: 3 }, // korrekte Antwort
                   
                ]
            },
            {
                id: 35,
                text: "Inwiefern haben Sie BNE bereits in Ihrem Unterricht / in Ihren Praktika integrieren können?",
                bereich: "Lehrperson: Handeln",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Gar nicht", wert: 1 },
                    { text: "Ein bisschen", wert: 2 },
                    { text: "Stark", wert: 3 }
                ]
            },
            {
                id: 36,
                text: "Um mein eigenes Rollen- und Funktionsverständnis in Zusammenhang mit nachhaltiger Entwicklung und BNE als Lehrperson zu definieren, möchte ich mich mit entsprechenden Konzepten auseinandersetzen.",
                bereich: "Lehrperson: Handeln",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Stimme eher nicht zu", wert: 1 },
                    { text: "Stimme teilweise zu", wert: 2 },
                    { text: "Stimme zu", wert: 3 }
                ]
            },

            // Unterricht: Prinzipien id 4x
            {
                id: 41,
                text: "Ich kenne bereits viele BNE-relevante Prinzipien, die ich im Unterricht umsetzen kann.",
                bereich: "Unterricht: Prinzipien",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Trifft nicht zu", wert: 1 },
                    { text: "Trifft teilweise zu", wert: 2 },
                    { text: "Trifft zu", wert: 3 }
                ]
            },
            {
                id: 42,
                text: "Aktualitätsbezug ist als eines von drei didaktischen BNE-Prinzipen im Lehrplan 21 verankert. Ist die Aussage korrekt?",
                bereich: "Unterricht: Prinzipien",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 1 },
                    { text: "Nein", wert: 3 } // korrekte Antwort
                ]
            },
            {
                id: 43,
                text: "«Im Unterricht werden eigene und kollektive Denkweisen und Werte aufgespürt und miteinander verglichen.» Um welches pädagogische Prinzip von éducation21 handelt es sich?",
                bereich: "Unterricht: Prinzipien",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Wertereflexion und Handlungsorientierung", wert: 3 }, // korrekte Antwort
                    { text: "Chancengerechtigkeit", wert: 1 },
                    { text: "Partizipation und Empowerment", wert: 1 }
                ]
            },
            {
                id: 44,
                text: "«Nachhaltige Entwicklung ist ein optimistischer Ansatz, der sich an einer positiven Zukunft orientiert.» Um welches pädagogische Prinzip von éducation21 handelt es sich?",
                bereich: "Unterricht: Prinzipien",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Visionsorientierung", wert: 3 }, // korrekte Antwort
                    { text: "Vernetztes Denken", wert: 1 },
                    { text: "Partizipation und Empowerment", wert: 1 }
                ]
            },
            {
                id: 45,
                text: "Um die BNE-Prinzipien noch besser verstehen zu können, möchte ich mich vertiefter mit diesen befassen.",
                bereich: "Unterricht: Prinzipien",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Stimme eher nicht zu", wert: 1 },
                    { text: "Stimme teilweise zu", wert: 2 },
                    { text: "Stimme zu", wert: 3 }
                ]
            },

            // Unterricht: Kompetenzen id 5x
            {
                id: 51,
                text: "Wie gut können Sie BNE-Kompetenzen in Ihrem Unterricht fördern?",
                bereich: "Unterricht: Kompetenzen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Grundlegend", wert: 1 },
                    { text: "Gut", wert: 2 },
                    { text: "Sehr gut", wert: 3 }
                ]
            },
            {
                id: 52,
                text: "Die von éducation21 formulierten Kompetenzen können den DeSeCo-Schlüsselkompetenzen zugeordnet werden. Zu welcher Kategorie gehören Verantwortung, Werte und Handeln?",
                bereich: "Unterricht: Kompetenzen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Interaktive Verwendung von Medien und Tools", wert: 1 },
                    { text: "Interagieren in heterogenen Gruppen", wert: 1 },
                    { text: "Eigenständiges Handeln", wert: 3 } // korrekte Antwort
                ]
            },
            {
                id: 53,
                text: "Im Lehrplan 21 sind spezifische BNE-Kompetenzen ausformuliert.",
                bereich: "Unterricht: Kompetenzen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 1 },
                    { text: "Nein, nur über fächerübergreifende Querverweise", wert: 3 }, // korrekte Antwort
                    { text: "Nein, überhaupt nicht", wert: 1 }
                ]
            },
            {
                id: 54,
                text: "Wie gut kennen Sie sich mit den BNE-Kompetenzen aus?",
                bereich: "Unterricht: Kompetenzen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig Kenntnisse", wert: 1 },
                    { text: "Mittlere Kompetenzen", wert: 2 },
                    { text: "Hohe Kompetenzen", wert: 3 }
                ]
            },
            {
                id: 55,
                text: "Um welche BNE-Kompetenz nach éducation21 handelt es sich: «Sich als Teil der Welt erfahren (Sich selbst, die soziale und natürliche Umwelt ganzheitlich und im globalen Kontext wahrnehmen)»?",
                bereich: "Unterricht: Kompetenzen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Verantwortung", wert: 3 }, // korrekte Antwort
                    { text: "Partizipation", wert: 1 },
                    { text: "Kooperation", wert: 1 }
                ]
            },
            {
                id: 56,
                text: "Um meinen Unterricht kompetenzorientiert gestalten zu können, möchte ich mich noch vertiefter mit den BNE-Kompetenzen auseinandersetzen.",
                bereich: "Unterricht: Kompetenzen",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Stimme eher nicht zu", wert: 1 },
                    { text: "Stimme teilweise zu", wert: 2 },
                    { text: "Stimme zu", wert: 3 }
                ]
            },
            {
                id: 57,
                text: "Wie schätzen Sie Ihre Kompetenzen im Bereich der BNE im Unterricht ein?",
                bereich: "Unterricht: Kompetenzen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig Kenntnisse", wert: 1 },
                    { text: "Mittlere Kompetenzen", wert: 2 },
                    { text: "Hohe Kompetenzen", wert: 3 }
                ]
            },
            {
                id: 58,
                text: "Die Kompetenz zur integrierten Problemlösung (Schlüsselkompetenzen für BNE im Rahmen der Agenda 2030) beinhaltet die Fähigkeit die eigenen Werte, Wahrnehmungen und Handlungen zu reflektieren.",
                bereich: "Unterricht: Kompetenzen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 1 }, 
                    { text: "Nein", wert: 3 }, // korrekte Antwort
                 
                ]
            },

            // Unterricht: Themen id 6x
            {
                id: 61,
                text: "Wie gut kennen Sie die fächerübergreifenden Themen zu nachhaltiger Entwicklung im Lehrplan 21?",
                bereich: "Unterricht: Themen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig", wert: 1 },
                    { text: "Gut", wert: 2 },
                    { text: "Sehr gut", wert: 3 }
                ]
            },
            {
                id: 62,
                text: "Im Lehrplan 21 ist das Thema \"Geschlechter und Gleichstellung\" kein fächerübergreifendes Thema im Kontext Bildung für nachhaltige Entwicklung.",
                bereich: "Unterricht: Themen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Richtig", wert: 1 },
                    { text: "Falsch", wert: 3 } // korrekte Antwort
                ]
            },
            {
                id: 63,
                text: "Im Lehrplan 21 werden sieben fächerübergreifende Themen unter der Leitidee Nachhaltiger Entwicklung aufgeführt.",
                bereich: "Unterricht: Themen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Richtig", wert: 3 }, // korrekte Antwort
                    { text: "Falsch", wert: 1 }
                ]
            },
            {
                id: 64,
                text: "Wie interessiert sind Sie daran, sich mit fächerübergreifenden Themen zur nachhaltigen Entwicklung auseinanderzusetzen?",
                bereich: "Unterricht: Themen",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig interessiert", wert: 1 },
                    { text: "Interessiert", wert: 2 },
                    { text: "sehr interessiert", wert: 3 }
                ]
            },
            {
                id: 65,
                text: "Im Lehrplan 21 finden sich zusätzlich zu den fächerübergreifenden Themen bei den fachspezifischen Kompetenzen noch BNE-Verweise.",
                bereich: "Unterricht: Themen",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Nein", wert: 1 },
                    { text: "Ja", wert: 3 } // korrekte Antwort
                ]
            },
            {
                id: 66,
                text: "Ich kann mir vorstellen auch weitere Themen interdisziplinär in meinen Fächern zu behandeln.",
                bereich: "Unterricht: Themen",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig interessiert", wert: 1 },
                    { text: "Interessiert", wert: 2 },
                    { text: "Sehr interessiert", wert: 3 }
                ]
            },

            // Unterricht: Methoden id 7x
            {
                id: 71,
                text: "Wie gut beherrschen Sie unterschiedliche Methoden zur Förderung von BNE im Unterricht?",
                bereich: "Unterricht: Methoden",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Grundlegend", wert: 1 },
                    { text: "Gut", wert: 2 },
                    { text: "Sehr gut", wert: 3 }
                ]
            },
            {
                id: 72,
                text: "Für die Förderung von kreativen Lösungsansätzen bei Nachhaltigkeitsproblemen eignet sich im Kontext von BNE die Methode Design Thinking.",
                bereich: "Unterricht: Methoden",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 3 }, // korrekte Antwort
                    { text: "Nein", wert: 1 }
                ]
            },
            {
                id: 73,
                text: "Schüler*innen setzen sich mit einem moralischen Dilemma auseinander und beschreiben ihre Gefühle. Welcher Unterrichtszugang trifft am besten zu?",
                bereich: "Unterricht: Methoden",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Transformatives Lernen", wert: 3 }, // korrekte Antwort
                    { text: "Entdeckendes Lernen", wert: 1 },
                    { text: "Situatives Lernen", wert: 1 }
                ]
            },
            {
                id: 74,
                text: "Wie interessiert sind Sie daran, diese Unterrichtsmethoden für BNE in Ihrem Unterricht umzusetzen?",
                bereich: "Unterricht: Methoden",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig interessiert", wert: 1 },
                    { text: "Interessiert", wert: 2 },
                    { text: "sehr interessiert", wert: 3 }
                ]
            },
            {
                id: 75,
                text: "Das problembasierte Lernen ist eine Methode der Zukunftswerkstatt.",
                bereich: "Unterricht: Methoden",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 1 }, 
                    { text: "Nein", wert: 3 }, // korrekte Antwort
                ]
            },

            // Schule: Schulentwicklung id 8x
            {
                id: 81,
                text: "Welche der untenstehenden Massnahmen ist für den Whole Institution Approach <strong> nicht </strong> von zentraler Bedeutung?",
                bereich: "Schule: Schulentwicklung",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Fächerübergreifende Projekte", wert: 1 },
                    { text: "Politische Einstellung von Lehrpersonen", wert: 3 }, // korrekte Antwort
                    { text: "Partizipative Schulkultur", wert: 1 },
                ]
            },
            {
                id: 82,
                text: "Das wichtigste Anliegen des Whole Institution Approaches ist es, dass alle Lehrpersonen BNE in ihrem Unterricht umsetzen.",
                bereich: "Schule: Schulentwicklung",
                ebene: "objektiv",
                typ: "mc",
                antworten: [
                    { text: "Ja", wert: 3 }, // korrekte Antwort
                    { text: "Nein", wert: 1 }
                ]
            },
            {
                id: 83,
                text: "Wie gut verstehen Sie das Konzept des Whole Institution Approach für die Umsetzung von BNE?",
                bereich: "Schule: Schulentwicklung",
                ebene: "subjektiv",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Grundlegend", wert: 1 },
                    { text: "Gut", wert: 2 },
                    { text: "Sehr gut", wert: 3 }
                ]
            },
            {
                id: 84,
                text: "Wie interessiert sind Sie an der Umsetzung von BNE im schulischen Kontext als angehende Lehrperson?",
                bereich: "Schule: Schulentwicklung",
                ebene: "interesse",
                typ: "slider",
                antworten: [
                    { text: "Keine Antwort", wert: 0 },
                    { text: "Wenig interessiert", wert: 1 },
                    { text: "Interessiert", wert: 2 },
                    { text: "sehr interessiert", wert: 3 }
                ]
            }
    
        ];

        // =========================================================
        // FRAGENKATALOG - ENDE
        // =========================================================

export { FRAGEN, BEREICHE, STUDIENFAECHER, FACH_BESCHREIBUNGEN, LERNGELEGENHEITEN };