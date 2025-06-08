import { ClientDatabase } from './database.js';

class CRMApp {
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
        document.getElementById('exportCSV').addEventListener('click', this.exportToCSV.bind(this));
    }

    async addClient(event) {
        event.preventDefault();
        const name = document.getElementById('clientName').value;
        const phone = document.getElementById('clientPhone').value;
        const reminderDate = document.getElementById('reminderDate').value;
        const address = document.getElementById('clientAddress').value;
        const sampleFamiliarization = document.getElementById('sampleFamiliarization').value;
        const assortmentConsultation = document.getElementById('assortmentConsultation').value;
        const newProductsConsultation = document.getElementById('newProductsConsultation').value;
        const proposalStatus = document.getElementById('proposalStatus').value;
        const disclosureStatus = document.getElementById('disclosureStatus').value;
        const deliveryDetails = document.getElementById('deliveryDetails').value;
        const packagingDetails = document.getElementById('packagingDetails').value;
        const hingeDetails = document.getElementById('hingeDetails').value;
        const guideDetails = document.getElementById('guideDetails').value;
        const liftMechanismDetails = document.getElementById('liftMechanismDetails').value;
        const handleDetails = document.getElementById('handleDetails').value;
        const standSupportDetails = document.getElementById('standSupportDetails').value;
        const monthlyPurchaseVolume = document.getElementById('monthlyPurchaseVolume').value;
        const currentProducts = document.getElementById('currentProducts').value;
        const openToChangeProducts = document.getElementById('openToChangeProducts').value;
        const clientDecision = document.getElementById('clientDecision').value;
        const nextSteps = document.getElementById('nextSteps').value;
        const clientInterest = document.getElementById('clientInterest').value;
        const dealPerspective = document.getElementById('dealPerspective').value;

        await this.db.addClient({ 
            name, 
            phone, 
            reminderDate, 
            address,
            sampleFamiliarization,
            assortmentConsultation,
            newProductsConsultation,
            proposalStatus,
            disclosureStatus,
            deliveryDetails,
            packagingDetails,
            hingeDetails,
            guideDetails,
            liftMechanismDetails,
            handleDetails,
            standSupportDetails,
            monthlyPurchaseVolume,
            currentProducts,
            openToChangeProducts,
            clientDecision,
            nextSteps,
            clientInterest,
            dealPerspective
        });
        this.renderClients();
        event.target.reset();
    }

    async renderClients(filteredClients = null) {
        const clientsList = document.getElementById('clientsList');
        clientsList.innerHTML = '';

        const clients = filteredClients || await this.db.getAllClients();
        clients.forEach(client => {
            const clientCard = this.createClientCard(client);
            clientsList.appendChild(clientCard);
        });
    }

    createClientCard(client) {
        const card = document.createElement('div');
        card.className = 'card client-card mb-2';
        card.innerHTML = `
            <div class="card-body d-flex justify-content-between">
                <div>
                    <h5 class="card-title">${client.name}</h5>
                    <p class="card-text">${client.phone}</p>
                    <p class="card-text">Адрес: ${client.address || 'Не указан'}</p>
                    <div>
                        <small>Образец: ${this.getYesNoText(client.sampleFamiliarization)}</small><br>
                        <small>Консультация ассортимент: ${this.getConsultationText(client.assortmentConsultation)}</small><br>
                        <small>Новинки: ${this.getConsultationText(client.newProductsConsultation)}</small><br>
                        <small>Предложение: ${this.getProposalText(client.proposalStatus)}</small><br>
                        <small>Раскрой: ${this.getProposalText(client.disclosureStatus)}</small>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    ${client.reminderDate ? `<small>Напомнить: ${client.reminderDate}</small>` : ''}
                    <div class="mt-2">
                        <button class="btn btn-sm btn-warning edit-client" data-id="${client.id}">Изменить</button>
                        <button class="btn btn-sm btn-danger delete-client" data-id="${client.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;

        card.querySelector('.edit-client').addEventListener('click', () => this.editClient(client));
        card.querySelector('.delete-client').addEventListener('click', () => this.deleteClient(client.id));

        return card;
    }

    async deleteClient(id) {
        await this.db.deleteClient(id);
        this.renderClients();
    }

    editClient(client) {
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientPhone').value = client.phone;
        document.getElementById('reminderDate').value = client.reminderDate;
        document.getElementById('clientAddress').value = client.address;
        document.getElementById('sampleFamiliarization').value = client.sampleFamiliarization;
        document.getElementById('assortmentConsultation').value = client.assortmentConsultation;
        document.getElementById('newProductsConsultation').value = client.newProductsConsultation;
        document.getElementById('proposalStatus').value = client.proposalStatus;
        document.getElementById('disclosureStatus').value = client.disclosureStatus;
        document.getElementById('deliveryDetails').value = client.deliveryDetails || '';
        document.getElementById('packagingDetails').value = client.packagingDetails || '';
        document.getElementById('hingeDetails').value = client.hingeDetails || '';
        document.getElementById('guideDetails').value = client.guideDetails || '';
        document.getElementById('liftMechanismDetails').value = client.liftMechanismDetails || '';
        document.getElementById('handleDetails').value = client.handleDetails || '';
        document.getElementById('standSupportDetails').value = client.standSupportDetails || '';
        document.getElementById('monthlyPurchaseVolume').value = client.monthlyPurchaseVolume || '';
        document.getElementById('currentProducts').value = client.currentProducts || '';
        document.getElementById('openToChangeProducts').value = client.openToChangeProducts || '';
        document.getElementById('clientDecision').value = client.clientDecision || '';
        document.getElementById('nextSteps').value = client.nextSteps || '';
        document.getElementById('clientInterest').value = client.clientInterest || '';
        document.getElementById('dealPerspective').value = client.dealPerspective || '';

        const form = document.getElementById('clientForm');
        const originalSubmitHandler = form.onsubmit;
        
        form.onsubmit = async (event) => {
            event.preventDefault();
            const updatedClient = {
                id: client.id,
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

            await this.db.updateClient(updatedClient);
            this.renderClients();
            
            form.reset();
            form.onsubmit = originalSubmitHandler;
        };
    }

    getStatusColor(status) {
        const statusColors = {
            'not_reached': 'bg-warning',
            'spoke': 'bg-success'
        };
        return statusColors[status] || 'bg-secondary';
    }

    getStatusText(status) {
        const statusTexts = {
            'not_reached': 'Не дозвонился',
            'spoke': 'Поговорил'
        };
        return statusTexts[status] || status;
    }

    exportToCSV() {
        this.db.getAllClients().then(clients => {
            const csvContent = this.convertToCSV(clients);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'crm_clients.csv');
        });
    }

    convertToCSV(clients) {
        const headers = [
            'Имя', 
            'Телефон', 
            'Дата напоминания', 
            'Адрес', 
            'Ознакомление с образцом', 
            'Консультация по ассортименту', 
            'Новинки товаров', 
            'Предложение', 
            'Раскрой',
            'Доставка',
            'Упаковка',
            'Петли',
            'Направляющие',
            'Подъемные механизмы',
            'Ручки',
            'Опоры / Ножки',
            'Ориентированный объем закупок в месяц',
            'Текущие товары',
            'Открыт к смене товаров',
            'Принятие решения клиентом',
            'Следующие шаги / Договоренности',
            'Интерес клиента',
            'Перспектива Сделки'
        ];
        const rows = clients.map(client => 
            `"${client.name}";"${client.phone}";"${client.reminderDate || ''}";"${client.address || ''}";"${this.getYesNoText(client.sampleFamiliarization)}";"${this.getConsultationText(client.assortmentConsultation)}";"${this.getConsultationText(client.newProductsConsultation)}";"${this.getProposalText(client.proposalStatus)}";"${this.getProposalText(client.disclosureStatus)}";"${client.deliveryDetails || ''}";"${client.packagingDetails || ''}";"${client.hingeDetails || ''}";"${client.guideDetails || ''}";"${client.liftMechanismDetails || ''}";"${client.handleDetails || ''}";"${client.standSupportDetails || ''}";"${client.monthlyPurchaseVolume || ''}";"${client.currentProducts || ''}";"${client.openToChangeProducts || ''}";"${client.clientDecision || ''}";"${client.nextSteps || ''}";"${client.clientInterest || ''}";"${client.dealPerspective || ''}"`.replace(/\n/g, ' ')
        );
        return "\uFEFF" + [headers.join(';'), ...rows].join('\n');
    }

    getYesNoText(value) {
        return value === 'yes' ? 'Да' : 'Нет';
    }

    getConsultationText(value) {
        return value === 'consulted' ? 'Проконсультирован' : 'Не Проконсультирован';
    }

    getProposalText(value) {
        return value === 'proposed' ? 'Предложили' : 'Не предложили';
    }

    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    scheduleNotifications() {
        // Будущая логика уведомлений
    }
}

new CRMApp();