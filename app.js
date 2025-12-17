const kategorije =
[
    {
        naziv: "Spider-Man",
        filmovi:
        [
            { naziv: "Spider-Man", godina: 2002, cijena: 5 },
            { naziv: "Spider-Man 2", godina: 2004, cijena: 5 },
            { naziv: "Spider-Man 3", godina: 2007, cijena: 5 },
            { naziv: "The Amazing Spider-Man", godina: 2012, cijena: 5 },
            { naziv: "The Amazing Spider-Man 2", godina: 2014, cijena: 5 }
        ]
    },

    {
        naziv: "Iron Man",
        filmovi:
        [
            { naziv: "Iron Man", godina: 2008, cijena: 6 },
            { naziv: "Iron Man 2", godina: 2010, cijena: 6 },
            { naziv: "Iron Man 3", godina: 2013, cijena: 6 }
        ]
    },

    {
        naziv: "Pirates of the Caribbean",
        filmovi:
        [
            { naziv: "The Curse of the Black Pearl", godina: 2003, cijena: 5 },
            { naziv: "Dead Man's Chest", godina: 2006, cijena: 5 },
            { naziv: "At World's End", godina: 2007, cijena: 5 },
            { naziv: "On Stranger Tides", godina: 2011, cijena: 5 },
            { naziv: "Dead Men Tell No Tales", godina: 2017, cijena: 5 }
        ]
    },
    {
        naziv: "Pojedinačni filmovi",
        filmovi:
        [
            { naziv: "Inception", godina: 2010, cijena: 4 },
            { naziv: "Avatar", godina: 2009, cijena: 6 },
            { naziv: "The Matrix", godina: 1999, cijena: 5 }
        ]
    }
];

let kosarica = [];

const filmoviDiv = document.getElementById("filmovi");
const stavkeKosarice = document.getElementById("stavkeKosarice");
const ukupnaCijena = document.getElementById("ukupnaCijena");
const kosaricaGumb = document.getElementById("kosaricaGumb");
const kosaricaProzor = document.getElementById("kosaricaProzor");

function dodajUKosaricu(film)
{
    let postoji = kosarica.find(f => f.naziv === film.naziv);
    if (postoji) {
        postoji.kolicina++;
    } else {
        kosarica.push({ ...film, kolicina: 1 });
    }
    prikaziKosaricu();
}

function prikaziKosaricu()
{
    stavkeKosarice.innerHTML = "";
    let ukupno = 0;

    kosarica.forEach((stavka, i) =>
    {
        const li = document.createElement("li");
        li.innerHTML = `
            ${stavka.naziv} - ${stavka.cijena} € x 
            <input type="number" value="${stavka.kolicina}" min="1" onchange="promijeniKolicinu(${i}, this.value)">
            = ${(stavka.kolicina * stavka.cijena).toFixed(2)} €
            <button onclick="obrisiStavku(${i})">Obriši</button>
        `;
        stavkeKosarice.appendChild(li);
        ukupno += stavka.kolicina * stavka.cijena;
    });

    ukupnaCijena.innerText = `Ukupno: ${ukupno.toFixed(2)} €`;
    kosaricaGumb.innerText = `Košarica (${kosarica.length})`;
}

function promijeniKolicinu(i, nova)
{
    kosarica[i].kolicina = parseInt(nova);
    prikaziKosaricu();
}

function obrisiStavku(i)
{
    kosarica.splice(i, 1);
    prikaziKosaricu();
}

function plati()
{
    alert("Hvala na posudbi! 🎬");
    kosarica = [];
    prikaziKosaricu();
    kosaricaProzor.style.display = "none";
}

kosaricaGumb.addEventListener("click", () =>
    {
        kosaricaProzor.style.display = kosaricaProzor.style.display === "none" ? "block" : "none";
    }
);

kategorije.forEach(kategorija => 
    {
        const acc = document.createElement("button");
        acc.className = "accordion";
        acc.innerText = kategorija.naziv;

        const panel = document.createElement("div");
        panel.className = "panel";

        kategorija.filmovi.forEach(film =>
            {
                const div = document.createElement("div");
                div.className = "film";
                div.innerHTML = `
                <strong>${film.naziv} (${film.godina})</strong><br>
                Cijena: ${film.cijena} €
                <br><button onclick='dodajUKosaricu(${JSON.stringify(film)})'>Dodaj</button>
                <hr>`;
                panel.appendChild(div);
            }
        );

        acc.addEventListener("click", function ()
        {
            this.classList.toggle("active");
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });

        filmoviDiv.appendChild(acc);
        filmoviDiv.appendChild(panel);
    }
);