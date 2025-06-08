import { ClientDatabase } from '../database.js';
import { renderClientCard } from './ClientCard.js';
import { exportClientsToExcel } from './excelExport.js';
import { fillFormWithClient, setupEditMode } from './EditClient.js';

// Helper: for mobile cards, display field list in reduced view
function fieldRow(label, value) {
    return `<div class="mb-1"><strong>${label}:</strong> <span>${value || '-'}</span></div>`;
}

export class CRMApp {
    constructor() {
        this.db = new ClientDatabase();
        this.initEventListeners();
        this.renderClients().catch(error => {
            console.error('Error rendering clients:', error);
        });
        this.requestNotificationPermission();
    }

    initEventListeners() {
        document.getElementById('clientForm').addEventListener('submit', this.addClient.bind(this));
        document.getElementById('exportCSV').addEventListener('click', this.exportToExcel.bind(this));
        window.addEventListener('resize', () => {
            if (window.innerWidth < 500) {
                document.body.style.padding = "0";
            }
        });
    }

    async addClient(event) {
        event.preventDefault();
        const data = this._getFormData();
        await this.db.addClient(data);
        this.renderClients();
        event.target.reset();
    }

    async renderClients(filteredClients = null) {
        const clientsList = document.getElementById('clientsList');
        clientsList.innerHTML = '';
        const clients = filteredClients || await this.db.getAllClients();
        if (!clients.length) {
            clientsList.innerHTML = `<div class="text-center text-muted pb-4 pt-4">Ни одного клиента не добавлено.</div>`;
        }
        clients.forEach(client => {
            const clientCard = renderClientCard(client, {
                onEdit: () => this.editClient(client),
                onDelete: () => this.deleteClient(client.id)
            });
            clientsList.appendChild(clientCard);
        });
    }

    async deleteClient(id) {
        await this.db.deleteClient(id);
        this.renderClients();
    }

    editClient(client) {
        fillFormWithClient(client);
        setupEditMode(client, this.db, () => {
            this.renderClients();
        });
    }

    async exportToExcel() {
        // Defensive: always load fresh list from db & if error - show alert
        try {
            let clients = await this.db.getAllClients();
            if (!Array.isArray(clients)) clients = [];
            exportClientsToExcel(clients);
        } catch (e) {
            alert('Ошибка экспорта таблицы: ' + (e.message || e));
            // Also log for debugging
            console.error('Export error:', e);
        }
    }

    _getFormData() {
        // Helper to extract all data from the form
        return {
            name: document.getElementById('clientName').value,
            phone: document.getElementById('clientPhone').value,
            reminderDate: document.getElementById('reminderDate').value,
            address: document.getElementById('clientAddress').value,
            sampleFamiliarization: document.getElementById('sampleFamiliarization').value,
            assortmentConsultation: document.getElementById('assortmentConsultation').value,
            newProductsConsultation: document.getElementById('newProductsConsultation').value,
            proposalStatus: document.getElementById('proposalStatus').value,
            disclosureStatus: document.getElementById('disclosureStatus').value,
            deliveryDetails: document.getElementById('deliveryDetails').value,
            packagingDetails: document.getElementById('packagingDetails').value,
            hingeDetails: document.getElementById('hingeDetails').value,
            guideDetails: document.getElementById('guideDetails').value,
            liftMechanismDetails: document.getElementById('liftMechanismDetails').value,
            handleDetails: document.getElementById('handleDetails').value,
            standSupportDetails: document.getElementById('standSupportDetails').value,
            monthlyPurchaseVolume: document.getElementById('monthlyPurchaseVolume').value,
            currentProducts: document.getElementById('currentProducts').value,
            openToChangeProducts: document.getElementById('openToChangeProducts').value,
            clientDecision: document.getElementById('clientDecision').value,
            nextSteps: document.getElementById('nextSteps').value,
            clientInterest: document.getElementById('clientInterest').value,
            dealPerspective: document.getElementById('dealPerspective').value
        };
    }

    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }
}