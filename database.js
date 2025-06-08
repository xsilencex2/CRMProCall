export class ClientDatabase {
    constructor() {
        this.dbName = 'MiniCRMDatabase';
        this.dbVersion = 1;
        this.db = null;
        this.dbPromise = this.initDatabase();
    }

    initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('clients')) {
                    db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    async addClient(client) {
        await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['clients'], 'readwrite');
            const store = transaction.objectStore('clients');
            const request = store.add({
                name: client.name,
                phone: client.phone,
                reminderDate: client.reminderDate,
                address: client.address,
                sampleFamiliarization: client.sampleFamiliarization,
                assortmentConsultation: client.assortmentConsultation,
                newProductsConsultation: client.newProductsConsultation,
                proposalStatus: client.proposalStatus,
                disclosureStatus: client.disclosureStatus,
                deliveryDetails: client.deliveryDetails,
                packagingDetails: client.packagingDetails,
                hingeDetails: client.hingeDetails,
                guideDetails: client.guideDetails,
                liftMechanismDetails: client.liftMechanismDetails,
                handleDetails: client.handleDetails,
                standSupportDetails: client.standSupportDetails,
                monthlyPurchaseVolume: client.monthlyPurchaseVolume,
                currentProducts: client.currentProducts,
                openToChangeProducts: client.openToChangeProducts,
                clientDecision: client.clientDecision,
                nextSteps: client.nextSteps,
                clientInterest: client.clientInterest,
                dealPerspective: client.dealPerspective
            });

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAllClients() {
        await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['clients'], 'readonly');
            const store = transaction.objectStore('clients');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteClient(id) {
        await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['clients'], 'readwrite');
            const store = transaction.objectStore('clients');
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async updateClient(client) {
        await this.dbPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['clients'], 'readwrite');
            const store = transaction.objectStore('clients');
            const request = store.put({
                id: client.id,
                name: client.name,
                phone: client.phone,
                reminderDate: client.reminderDate,
                address: client.address,
                sampleFamiliarization: client.sampleFamiliarization,
                assortmentConsultation: client.assortmentConsultation,
                newProductsConsultation: client.newProductsConsultation,
                proposalStatus: client.proposalStatus,
                disclosureStatus: client.disclosureStatus,
                deliveryDetails: client.deliveryDetails,
                packagingDetails: client.packagingDetails,
                hingeDetails: client.hingeDetails,
                guideDetails: client.guideDetails,
                liftMechanismDetails: client.liftMechanismDetails,
                handleDetails: client.handleDetails,
                standSupportDetails: client.standSupportDetails,
                monthlyPurchaseVolume: client.monthlyPurchaseVolume,
                currentProducts: client.currentProducts,
                openToChangeProducts: client.openToChangeProducts,
                clientDecision: client.clientDecision,
                nextSteps: client.nextSteps,
                clientInterest: client.clientInterest,
                dealPerspective: client.dealPerspective
            });

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}