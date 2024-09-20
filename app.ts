type TipoMezzo = 'bici' | 'scooter' | 'monopattino';
type StatoMezzo = 'disponibile' | 'in uso';

interface IMezzo{
    tipo: TipoMezzo,
    stato: StatoMezzo,
    id: string,

    assegnaUtente(utente:IUtente): void
}

interface IUtente{
    id:string,
    nome: string,
    cognome: string,
    email: string,
    pagamento: string,

    prenotaMezzo(mezzo:IMezzo, citta:Citta):void
}

interface ICitta{
    nomeCitta: string,
    mezziDisponibili: IMezzo[]

    aggiungiMezzo(mezzo:IMezzo): void
}



class Mezzo implements IMezzo{

    tipo: TipoMezzo;
    stato: StatoMezzo;
    id: string;
    utenteAssegnato: IUtente | null;

    constructor(tipo: TipoMezzo, id: string){
        this.tipo = tipo;
        this.id = id;
        this.stato = 'disponibile'; 
        this.utenteAssegnato = null; 
    }


    assegnaUtente(utente: IUtente): void {
        if(this.stato === 'disponibile'){
            this.utenteAssegnato = utente;
            this.stato = 'in uso';
            console.log(`Mezzo ${this.id} ${this.tipo} assegnato a ${utente.nome}`);
        } {
            console.log(`Mezzo ${this.id} ${this.tipo} non disponibile`);
        }
    }
}

class Utente implements IUtente{

    id: string
    nome: string;
    cognome: string;
    email: string;
    pagamento: string;
    mezzoPrenotato: IMezzo | null;

    constructor(id: string, nome: string, cognome: string, email: string, pagamento: string){
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.pagamento = pagamento;
        this.mezzoPrenotato = null;
    }

    prenotaMezzo(mezzo: IMezzo, citta:Citta): void {
        if(mezzo.stato === 'disponibile'){
            mezzo.assegnaUtente(this);
            console.log(`Utente ${this.nome} ha prenotato il mezzo ${mezzo.id} ${mezzo.tipo} nella cittá di ${citta.nomeCitta}`)
        } {
            console.log(`Mezzo ${mezzo.id} ${mezzo.tipo} non é disponibile per la prenotazione`)
        }
    }

}

class Citta implements ICitta{

    nomeCitta: string;
    mezziDisponibili: IMezzo[];

    constructor(nomeCitta: string){
        this.nomeCitta = nomeCitta;
        this.mezziDisponibili = [];
    }

    

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezziDisponibili.push(mezzo);
        console.log(`Mezzo ${mezzo.id} ${mezzo.tipo} aggiunto alla cittá di ${this.nomeCitta}`)
        
    }
    
}

const utente1: IUtente = new Utente('u1', 'Mario', 'Rossi', 'mario.rossi@example.com', 'Carta di Credito');
const utente2: IUtente = new Utente('u2', 'Luca', 'Bianchi', 'luca.bianchi@example.com', 'PayPal');

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