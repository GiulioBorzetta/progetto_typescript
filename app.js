"use strict";
class Mezzo {
    constructor(tipo, id) {
        this.tipo = tipo;
        this.id = id;
        this.stato = 'disponibile';
        this.utenteAssegnato = null;
    }
    assegnaUtente(utente) {
        if (this.stato === 'disponibile') {
            this.utenteAssegnato = utente;
            this.stato = 'in uso';
            console.log(`Mezzo ${this.id} ${this.tipo} assegnato a ${utente.nome}`);
        }
        {
            console.log(`Mezzo ${this.id} ${this.tipo} non disponibile`);
        }
    }
}
class Utente {
    constructor(id, nome, cognome, email, pagamento) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.pagamento = pagamento;
        this.mezzoPrenotato = null;
    }
    prenotaMezzo(mezzo, citta) {
        if (mezzo.stato === 'disponibile') {
            mezzo.assegnaUtente(this);
            console.log(`Utente ${this.nome} ha prenotato il mezzo ${mezzo.id} ${mezzo.tipo} nella cittá di ${citta.nomeCitta}`);
        }
        {
            console.log(`Mezzo ${mezzo.id} ${mezzo.tipo} non é disponibile per la prenotazione`);
        }
    }
}
class Citta {
    constructor(nomeCitta) {
        this.nomeCitta = nomeCitta;
        this.mezziDisponibili = [];
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log(`Mezzo ${mezzo.id} ${mezzo.tipo} aggiunto alla cittá di ${this.nomeCitta}`);
    }
}
const utente1 = new Utente('u1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'Carta di Credito');
const utente2 = new Utente('u2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'PayPal');
const bici1 = new Mezzo('bici', 'bici123');
const scooter1 = new Mezzo('scooter', 'scooter456');
const monopattino1 = new Mezzo('monopattino', 'mono789');
const roma = new Citta('Roma');
const milano = new Citta('Milano');
roma.aggiungiMezzo(bici1);
roma.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);
utente1.prenotaMezzo(bici1, roma);
utente2.prenotaMezzo(bici1, roma);
utente2.prenotaMezzo(scooter1, roma);
utente2.prenotaMezzo(bici1, roma);
utente1.prenotaMezzo(monopattino1, milano);
utente2.prenotaMezzo(monopattino1, milano);
utente1.prenotaMezzo(scooter1, roma);
