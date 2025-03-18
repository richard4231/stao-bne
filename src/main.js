    import { FRAGEN, BEREICHE, STUDIENFAECHER, FACH_BESCHREIBUNGEN, LERNGELEGENHEITEN } from './config.js';
    
    const MIN_WERT = 0;
    const MAX_WERT = 3;
    const MAX_SELECTED_SUBJECTS = 4;

            
    // Globaler State für Antworten und aktuelle Seite
    let antworten = {};
    let personalData = {};
    let currentPage = 0;
    let pages = [];
    let selectedSubjects = [];
    let selectedLerngelegenheiten = [];

    // Handler für Lerngelegenheit-Auswahl
    function handleLerngelegenheitSelection(lgId) {
        // Toggle Auswahl
        if (selectedLerngelegenheiten.includes(lgId)) {
            // Entfernen, wenn bereits ausgewählt
            selectedLerngelegenheiten = selectedLerngelegenheiten.filter(id => id !== lgId);
        } else {
            // Hinzufügen, wenn noch nicht ausgewählt
            selectedLerngelegenheiten.push(lgId);
        }
        
        // Element-Stil aktualisieren
        const element = document.querySelector(`.dropdown-option[data-id="${lgId}"]`);
        if (element) {
            if (selectedLerngelegenheiten.includes(lgId)) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        }
        
        // Ausgewählte Elemente anzeigen
        updateSelectedLerngelegenheitenDisplay();
    }

    // Funktion zum Aktualisieren der Anzeige der ausgewählten Lerngelegenheiten
    function updateSelectedLerngelegenheitenDisplay() {
        const display = document.getElementById('selected-lerngelegenheiten-display');
        if (!display) return;
        
        if (selectedLerngelegenheiten.length === 0) {
            display.innerHTML = '<span class="placeholder">Bitte auswählen (Klicken zum Öffnen)...</span>';
            return;
        }
        
        display.innerHTML = selectedLerngelegenheiten.map(id => {
            const lg = LERNGELEGENHEITEN.find(item => item.id === id);
            if (!lg) return '';
            
            return `<span class="selected-tag">${lg.titel} <span class="remove-tag" onclick="removeLerngelegenheit('${id}')">×</span></span>`;
        }).join('');
    }

    // Funktion zum Entfernen einer Lerngelegenheit
    function removeLerngelegenheit(id) {
        event.stopPropagation(); // Verhindert, dass das Dropdown sich schließt
        
        // Aus der Auswahl entfernen
        selectedLerngelegenheiten = selectedLerngelegenheiten.filter(item => item !== id);
        
        // Element-Stil aktualisieren
        const element = document.querySelector(`.dropdown-option[data-id="${id}"]`);
        if (element) {
            element.classList.remove('selected');
        }
        
        // Anzeige aktualisieren
        updateSelectedLerngelegenheitenDisplay();
    }

    // Seiten nach Bereichen erstellen
    function initPages() {
        // Startseite ist bereits vorhanden (page-start)
        // Persönliche Daten-Seite ist bereits vorhanden (page-0)
        
        // Gruppiere Fragen nach Bereichen
        const bereicheFragen = BEREICHE.reduce((acc, bereich) => {
            acc[bereich] = FRAGEN.filter(frage => frage.bereich === bereich);
            return acc;
        }, {});
        
        // Erstelle für jeden Bereich eine Seite
        let pageIndex = 1; // Start bei 1, weil 0 bereits persönliche Daten sind
        BEREICHE.forEach(bereich => {
            const pageId = `page-${pageIndex}`;
            pages.push(pageId);
            
            // Erstelle Container für diesen Bereich
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.id = pageId;
            
            // Titel für den Bereich
            const bereichTitel = document.createElement('h2');
            bereichTitel.textContent = bereich;
            pageDiv.appendChild(bereichTitel);
            
            // Fragen für diesen Bereich hinzufügen
            const bereichContainer = document.createElement('div');
            bereichContainer.id = `bereich-${pageIndex}`;
            pageDiv.appendChild(bereichContainer);
            
            // Füge die Seite zum Dokument hinzu
            document.querySelector('.container').insertBefore(pageDiv, document.getElementById('page-final'));
            
            pageIndex++;
        });
        
        // Final-Seite hinzufügen
        pages.push('page-final');
        
        // Fortschrittsanzeige erstellen
        updateProgressIndicator();
    }

    // Fortschrittsanzeige aktualisieren
    function updateProgressIndicator() {
        const progressContainer = document.getElementById('progressIndicator');
        progressContainer.innerHTML = '';
        
        const totalPages = pages.length + 2; // +1 für Startseite, +1 für persönliche Daten
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === currentPage) {
                dot.classList.add('active');
            }
            progressContainer.appendChild(dot);
        }
    }

    // Fragen für den aktuellen Bereich rendern
    function renderFragen() {
        if (currentPage === 0 || currentPage === 1 || currentPage === pages.length + 1) {
            return; // Keine Fragen auf der Start-, persönlichen Daten- und Ergebnisseite
        }
        
        const bereichIndex = currentPage - 2; // -2 weil Start- und persönliche Daten-Seite
        const bereich = BEREICHE[bereichIndex];
        const bereichContainer = document.getElementById(`bereich-${currentPage - 1}`);
        
        // Fragen für diesen Bereich filtern
        const bereichFragen = FRAGEN.filter(frage => frage.bereich === bereich);
        
        bereichContainer.innerHTML = bereichFragen.map(frage => {
            if (frage.typ === 'slider') {
                return `
                    <div class="question-card">
                        <div class="question-title">${frage.text}</div>
                        <div class="meta-info">
                            Ebene: ${frage.ebene}
                        </div>
                        <div class="slider-container">
                            <input 
                                type="range" 
                                min="${MIN_WERT}" 
                                max="${MAX_WERT}" 
                                step="1"
                                value="${antworten[frage.id] || MIN_WERT}"
                                onchange="handleAntwort(${frage.id}, parseInt(this.value))"
                                oninput="this.nextElementSibling.nextElementSibling.textContent = this.value"
                                class="slider"
                            >
                            <div class="slider-labels">
                                ${frage.antworten.map(antwort => `
                                    <span>${antwort.text}</span>
                                `).join('')}
                            </div>
                            <div class="slider-value">${antworten[frage.id] || MIN_WERT}</div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="question-card">
                        <div class="question-title">${frage.text}</div>
                        <div class="meta-info">
                            Ebene: ${frage.ebene}
                        </div>
                        <div class="mc-group">
                            ${frage.antworten.map((antwort, idx) => `
                                <label class="mc-option">
                                    <input 
                                        type="radio" 
                                        name="frage-${frage.id}" 
                                        value="${antwort.wert}"
                                        ${antworten[frage.id] === antwort.wert ? 'checked' : ''}
                                        onchange="handleAntwort(${frage.id}, ${antwort.wert})"
                                    >
                                    ${antwort.text}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    // Sammeln der persönlichen Daten
    function collectPersonalData() {
        personalData = {
            vorname: document.getElementById('vorname').value,
            nachname: document.getElementById('nachname').value,
            matrikelnummer: document.getElementById('matrikelnummer').value,
            email: document.getElementById('email').value,
            studienfaecher: selectedSubjects,
            lerngelegenheiten: selectedLerngelegenheiten.map(id => {
                const lg = LERNGELEGENHEITEN.find(item => item.id === id);
                return lg ? `${lg.titel} (${lg.kategorie}, ${lg.semester})` : id;
            })
        };
    }

    // Anzeigen der persönlichen Daten auf der Ergebnisseite
    function renderPersonalData() {
        const container = document.getElementById('personalDataSummary');
        
        // Überprüfen, ob persönliche Daten vorhanden sind
        const hasData = Object.values(personalData).some(value => 
            Array.isArray(value) ? value.length > 0 : (value && value.trim && value.trim() !== '')
        );
        
        if (!hasData) {
            container.innerHTML = '<p>Keine persönlichen Daten angegeben.</p>';
            return;
        }
        
        const labels = {
            vorname: 'Vorname',
            nachname: 'Nachname',
            matrikelnummer: 'Matrikelnummer',
            email: 'E-Mail',
            studienfaecher: 'Studienfächer',
            lerngelegenheiten: 'Besuchte Lerngelegenheiten'
        };
        
        let html = '';
        for (const [key, value] of Object.entries(personalData)) {
            // Spezialbehandlung für Studienfächer-Array
            if (key === 'studienfaecher' && Array.isArray(value) && value.length > 0) {
                const faecherMitBeschreibung = value.map(fach => 
                    `${fach} (${FACH_BESCHREIBUNGEN[fach] || fach})`
                );
                html += `
                    <div class="personal-data-item">
                        <span class="personal-data-label">${labels[key]}:</span> 
                        ${faecherMitBeschreibung.join(', ')}
                    </div>
                `;
            }
            // Spezialbehandlung für Lerngelegenheiten-Array
            else if (key === 'lerngelegenheiten' && Array.isArray(value) && value.length > 0) {
                html += `
                    <div class="personal-data-item">
                        <span class="personal-data-label">${labels[key]}:</span>
                        <ul class="lerngelegenheiten-list">
                            ${value.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            // Normale Textfelder
            else if (key !== 'studienfaecher' && key !== 'lerngelegenheiten' && 
                        value && (!Array.isArray(value) && value.trim !== undefined && value.trim() !== '')) {
                html += `
                    <div class="personal-data-item">
                        <span class="personal-data-label">${labels[key]}:</span> 
                        ${value}
                    </div>
                `;
            }
        }
        
        container.innerHTML = html;
    }

    // Ergebniszusammenfassung anzeigen
    function renderResultsSummary() {
        const resultContainer = document.getElementById('resultsSummary');
        
        // Ergebnisse für jeden Bereich erstellen
        const bereichErgebnisse = BEREICHE.map(bereich => {
            const bereichFragen = FRAGEN.filter(frage => frage.bereich === bereich);
            const ebenen = ['subjektiv', 'objektiv', 'interesse'];
            
            const ebenenWerte = ebenen.map(ebene => {
                const ebenenFragen = bereichFragen.filter(frage => frage.ebene === ebene);
                const beantworteteFragen = ebenenFragen.filter(frage => antworten[frage.id] !== undefined);
                
                if (beantworteteFragen.length === 0) return 0;
                
                const summe = beantworteteFragen.reduce((sum, frage) => sum + antworten[frage.id], 0);
                return (summe / beantworteteFragen.length).toFixed(1);
            });
            
            return `
                <div style="margin-bottom: 10px;">
                    <strong>${bereich}</strong>
                    <ul style="margin-top: 5px;">
                        <li>Subjektiv: ${ebenenWerte[0]}</li>
                        <li>Objektiv: ${ebenenWerte[1]}</li>
                        <li>Interesse: ${ebenenWerte[2]}</li>
                    </ul>
                </div>
            `;
        });
        
        // Bereiche in zwei Spalten aufteilen
        const mitte = Math.ceil(bereichErgebnisse.length / 2);
        const ergebnisseLinks = bereichErgebnisse.slice(0, mitte).join('');
        const ergebnisseRechts = bereichErgebnisse.slice(mitte).join('');
        
        // HTML für zwei Spalten erzeugen
        const html = `
            <div class="results-columns">
                <div class="results-column">${ergebnisseLinks}</div>
                <div class="results-column">${ergebnisseRechts}</div>
            </div>
        `;
        
        resultContainer.innerHTML = bereichErgebnisse.length > 0 ? html : '<p>Keine Daten vorhanden.</p>';
    }

    //Canvas-Initialisierung für den Radar-Chart
    function setupCanvas(canvas) {
        // Setze Canvas auf Grösse mit guter Auflösung
        canvas.width = 1600;
        canvas.height = 1600;
        
        // Setze Display-Grösse via CSS
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.maxWidth = '1000px';
        
        const ctx = canvas.getContext('2d');
        
        // Aktiviere Anti-Aliasing für glattere Linien
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        return ctx;
    }

    // Antwort Handler
    function handleAntwort(fragenId, wert) {
        antworten[fragenId] = wert;
    }

    // Handler für Fachauswahl
    function handleSubjectSelection(event) {
        const subject = event.target.getAttribute('data-subject');
        const isSelected = selectedSubjects.includes(subject);
        
        if (isSelected) {
            // Entferne Fach aus der Auswahl
            selectedSubjects = selectedSubjects.filter(s => s !== subject);
            event.target.classList.remove('selected');
        } else {
            // Füge Fach zur Auswahl hinzu, wenn weniger als MAX_SELECTED_SUBJECTS ausgewählt sind
            if (selectedSubjects.length < MAX_SELECTED_SUBJECTS) {
                selectedSubjects.push(subject);
                event.target.classList.add('selected');
            }
        }
        
        // Zähler aktualisieren
        updateSubjectCounter();
        
        // Alle Fächer aktivieren/deaktivieren basierend auf der Auswahlanzahl
        updateSubjectAvailability();
    }

    // Zähler für ausgewählte Fächer aktualisieren
    function updateSubjectCounter() {
        const counter = document.getElementById('selection-counter');
        counter.textContent = `Ausgewählte Fächer: ${selectedSubjects.length}/${MAX_SELECTED_SUBJECTS}`;
    }

    // Verfügbarkeit der Fächer aktualisieren
    function updateSubjectAvailability() {
        const maxReached = selectedSubjects.length >= MAX_SELECTED_SUBJECTS;
        
        document.querySelectorAll('.subject-item').forEach(item => {
            const subject = item.getAttribute('data-subject');
            const isSelected = selectedSubjects.includes(subject);
            
            if (maxReached && !isSelected) {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
    }

    // Erstellen der Studienfächer-Buttons
    function renderSubjectsSelection() {
        const container = document.getElementById('subjects-container');
        if (!container) return;
        
        container.innerHTML = STUDIENFAECHER.map(fach => `
            <div class="subject-item" data-subject="${fach}" onclick="handleSubjectSelection(event)">
                ${fach}
            </div>
        `).join('');
        
        // Bereits ausgewählte Fächer markieren
        selectedSubjects.forEach(fach => {
            const element = container.querySelector(`[data-subject="${fach}"]`);
            if (element) {
                element.classList.add('selected');
            }
        });
        
        // Verfügbarkeit aktualisieren
        updateSubjectAvailability();
        
        // Zähler aktualisieren
        updateSubjectCounter();
    }

    // Radar-Chart zeichnen 
    function drawRadar() {
        const canvas = document.getElementById('radarCanvas');
        const ctx = setupCanvas(canvas);

        // Berechne das Zentrum und den Radius basierend auf den tatsächlichen Canvas-Dimensionen
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35; // xx% des Canvas-Radius verwenden
        
        // Canvas löschen
        ctx.clearRect(0, 0, width, height);

        const anzahlBereiche = BEREICHE.length;
        const winkel = (2 * Math.PI) / anzahlBereiche;

        // Hilfsfunktion zum Zeichnen der verschiedenen Marker
        function drawMarker(x, y, type, color) {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            
            switch(type) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(x, y, 8, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(x, y - 8);
                    ctx.lineTo(x + 8, y + 8);
                    ctx.lineTo(x - 8, y + 8);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'square':
                    ctx.beginPath();
                    ctx.rect(x - 6, y - 6, 12, 12);
                    ctx.fill();
                    ctx.stroke();
                    break;
            }
        }

        // Konzentrische Kreise für die drei Radien
        for (let r = 1; r <= 3; r++) {
            ctx.beginPath();
            ctx.strokeStyle = '#d1d5db';
            ctx.lineWidth = 1;
            
            // Berechne den aktuellen Radius (von innen nach aussen)
            const currentRadius = radius * (r / 3);
            
            // Zeichne einen Kreis mit dem aktuellen Radius
            ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Achsenlinien vom Zentrum zu den äusseren Punkten
        ctx.beginPath();
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        for (let i = 0; i < anzahlBereiche; i++) {
            const angle = i * winkel - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Beschriftungen
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = '#000';
        
        BEREICHE.forEach((bereich, i) => {
            const angle = i * winkel - Math.PI / 2;
            const labelRadius = radius + 30; // Abstand für die Beschriftungen
            let x = centerX + labelRadius * Math.cos(angle);
            let y = centerY + labelRadius * Math.sin(angle);
            
            // Text an die Achsenausrichtung anpassen
            if (Math.cos(angle) < -0.1) {
                ctx.textAlign = 'right';
            } else if (Math.cos(angle) > 0.1) {
                ctx.textAlign = 'left';
            } else {
                ctx.textAlign = 'center';
            }
            
            // Vertikale Anpassungen
            if (Math.sin(angle) > 0.9) {
                y += 10; // unten
            } else if (Math.sin(angle) < -0.9) {
                y -= 5; // oben
            }
            
            // Text in zwei Zeilen aufteilen
            const lines = splitBereichLabel(bereich);
            
            // Erste Zeile (kleiner Abstand nach oben)
            ctx.font = 'bold 30px Arial';
            ctx.fillText(lines[0], x, y - 15);
            
            // Zweite Zeile (kleiner Abstand nach unten)
            ctx.font = '30px Arial';
            ctx.fillText(lines[1], x, y + 15);
        });
        // Zurücksetzen des textAlign
        ctx.textAlign = 'left';

        // Daten aggregieren und normalisieren
        const aggregierteWerte = BEREICHE.reduce((acc, bereich) => {
            acc[bereich] = {
                subjektiv: [],
                objektiv: [],
                interesse: []
            };
            return acc;
        }, {});

        Object.entries(antworten).forEach(([fragenId, wert]) => {
            const frage = FRAGEN.find(f => f.id === parseInt(fragenId));
            if (frage) {
                aggregierteWerte[frage.bereich][frage.ebene].push(wert);
            }
        });

        const chartData = BEREICHE.map(bereich => ({
            bereich,
            subjektiv: durchschnitt(aggregierteWerte[bereich].subjektiv),
            objektiv: durchschnitt(aggregierteWerte[bereich].objektiv),
            interesse: durchschnitt(aggregierteWerte[bereich].interesse)
        }));

        // Definition der Ebenen mit ihren Eigenschaften
        const ebenen = [
            { name: 'subjektiv', farbe: ['rgba(37, 99, 235, 0.2)', 'rgba(37, 99, 235, 0.9)'], marker: 'circle' },
            { name: 'objektiv', farbe: ['rgba(22, 163, 74, 0.2)', 'rgba(22, 163, 74, 0.9)'], marker: 'triangle' },
            { name: 'interesse', farbe: ['rgba(220, 38, 38, 0.2)', 'rgba(220, 38, 38, 0.9)'], marker: 'square' }
        ];

        // Zeichne die Datenpunkte und Verbindungslinien
        ebenen.forEach((ebene) => {
            const punkte = chartData.map((data, i) => {
                const normalisierterWert = data[ebene.name] / 3;
                const angle = i * winkel - Math.PI / 2;
                return {
                    x: centerX + ((radius * normalisierterWert)) * Math.cos(angle),
                    y: centerY + ((radius * normalisierterWert)) * Math.sin(angle)
                };
            });

            // Zeichne die Verbindungslinien
            ctx.beginPath();
            ctx.fillStyle = ebene.farbe[0];
            ctx.strokeStyle = ebene.farbe[1];
            ctx.lineWidth = 2;

            punkte.forEach((punkt, i) => {
                if (i === 0) {
                    ctx.moveTo(punkt.x, punkt.y);
                } else {
                    ctx.lineTo(punkt.x, punkt.y);
                }
            });
            ctx.lineTo(punkte[0].x, punkte[0].y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Zeichne die Marker an den Datenpunkten
            punkte.forEach(punkt => {
                drawMarker(punkt.x, punkt.y, ebene.marker, ebene.farbe[1]);
            });
        });
    }

    // Hilfsfunktion: Durchschnitt berechnen
    function durchschnitt(werte) {
        if (werte.length === 0) return MIN_WERT;
        return werte.reduce((a, b) => a + b, 0) / werte.length;
    }

    // Hilfsfunktion: Bereichsnamen in zwei Zeilen aufteilen
    function splitBereichLabel(text) {
        // Aufteilen bei ": " (z.B. "Lehrperson: Wissen" wird zu ["LP:", "Wissen"])
        const match = text.match(/^([^:]+):\s*(.+)$/);
        if (match) {
            return [match[1] + ":", match[2]];
        }
        
        // Fallback: Teile nach dem ersten Wort
        const words = text.split(" ");
        if (words.length > 1) {
            return [words[0], words.slice(1).join(" ")];
        }
        
        // Wenn keine Aufteilung möglich ist
        return [text, ""];
    }

    // Seiten-Navigation
    function goToPage(pageIndex) {
        // Verstecke aktuelle Seite
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.classList.remove('active');
        }
        
        // Sammle persönliche Daten, wenn von Seite 1 (persönliche Daten) weiternavigiert wird
        if (currentPage === 1 && pageIndex > 1) {
            collectPersonalData();
            console.log("Gesammelte Daten:", personalData);
        }
        
        // Zeige neue Seite
        currentPage = pageIndex;
        
        // Navigation-Abstand anpassen
        const navigationElement = document.querySelector('.navigation');
        if (navigationElement) {
            // Extra Abstand nur für die persönliche Daten-Seite
            navigationElement.style.marginTop = currentPage === 1 ? '300px' : '20px';
        }
        
        // Für die Startseite
        if (currentPage === 0) {
            document.getElementById('page-start').classList.add('active');
        }
        // Für die persönliche Daten-Seite
        else if (currentPage === 1) {
            document.getElementById('page-0').classList.add('active');
            renderSubjectsSelection(); // Sicherstellen, dass die Fächerauswahl gerendert wird
            
            // Lerngelegenheiten-Liste manuell füllen
            const container = document.getElementById('lerngelegenheiten-list');
            if (container) {
                container.innerHTML = LERNGELEGENHEITEN.map(lg => `
                    <div class="dropdown-option ${selectedLerngelegenheiten.includes(lg.id) ? 'selected' : ''}" 
                            data-id="${lg.id}" 
                            onclick="handleLerngelegenheitSelection('${lg.id}')">
                        <div class="dropdown-option-content">
                            <div class="dropdown-option-title">${lg.titel}</div>
                            <div class="dropdown-option-info">
                                <span class="option-category">${lg.kategorie}</span>
                                <span class="option-semester">${lg.semester}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Suchfunktion initialisieren
                const searchInput = document.getElementById('lerngelegenheiten-search');
                if (searchInput) {
                    searchInput.addEventListener('input', function() {
                        const searchTerm = this.value.toLowerCase();
                        const options = document.querySelectorAll('#lerngelegenheiten-list .dropdown-option');
                        let hasResults = false;
                        
                        options.forEach(option => {
                            const text = option.textContent.toLowerCase();
                            if (text.includes(searchTerm)) {
                                option.style.display = 'block';
                                hasResults = true;
                            } else {
                                option.style.display = 'none';
                            }
                        });
                        
                        // "Keine Ergebnisse" anzeigen, wenn nötig
                        const noResultsElement = document.getElementById('no-results');
                        if (!hasResults) {
                            if (!noResultsElement) {
                                const noResults = document.createElement('div');
                                noResults.id = 'no-results';
                                noResults.className = 'no-results';
                                noResults.textContent = 'Keine Ergebnisse gefunden';
                                document.getElementById('lerngelegenheiten-list').appendChild(noResults);
                            }
                        } else if (noResultsElement) {
                            noResultsElement.remove();
                        }
                    });
                }
                
                // Ausgewählte Optionen anzeigen
                updateSelectedLerngelegenheitenDisplay();
            }
        } 
        // Für die Ergebnisseite
        else if (currentPage === pages.length + 1) {
            renderPersonalData();
            renderResultsSummary();
            document.getElementById('page-final').classList.add('active');
            
            // Verzögerung zum Zeichnen des Radar-Diagramms
            setTimeout(() => {
                try {
                    drawRadar();
                    console.log("Radar-Chart erfolgreich gezeichnet");
                } catch (e) {
                    console.error("Fehler beim Zeichnen des Radar-Charts:", e);
                }
            }, 100);
        } 
        // Für die Frageseiten
        else {
            renderFragen();
            document.getElementById(pages[currentPage - 2]).classList.add('active');
        }
        
        // Navigation-Buttons aktualisieren
        document.getElementById('prevButton').disabled = currentPage === 0;
        document.getElementById('nextButton').textContent = currentPage === pages.length + 1 ? 'Abschliessen' : 'Weiter';
        
        // Fortschrittsanzeige aktualisieren
        updateProgressIndicator();
    }

    // Event-Listener für Navigation
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentPage < pages.length + 1) {
            goToPage(currentPage + 1);
        } else {
            // Formular abschliessen
            window.print();
        }
    });

    // Responsive Canvas
    window.addEventListener('resize', () => {
        if (currentPage === pages.length + 1) {
            drawRadar();
        }
    });

    // Initialisierung
    function init() {
        initPages();
        
        // Erste Seite laden
        goToPage(0); // Start mit der Startseite
    }

    // Starte die Anwendung
    document.addEventListener('DOMContentLoaded', function() {
        init();
        
        // Globale Funktionen für Event-Handler
        window.handleAntwort = handleAntwort;
        window.handleSubjectSelection = handleSubjectSelection;
        window.handleLerngelegenheitSelection = handleLerngelegenheitSelection;
        window.updateSelectedLerngelegenheitenDisplay = updateSelectedLerngelegenheitenDisplay;
        window.removeLerngelegenheit = removeLerngelegenheit;
 });