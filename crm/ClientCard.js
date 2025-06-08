import { getYesNoText, getConsultationText, getProposalText } from './fieldFormatters.js';

// Reusable for both desktop and mobile
function fieldRow(label, value) {
    return `<div class="mb-1"><strong>${label}:</strong> <span>${value || '-'}</span></div>`;
}

export function renderClientCard(client, { onEdit, onDelete }) {
    const card = document.createElement('div');
    card.className = 'card client-card mb-2';

    let cardContent = `
        <div class="card-body d-flex justify-content-between flex-wrap">
            <div style="min-width:0;word-break:break-word;">
                <div class="fw-bold fs-5 mb-1">${client.name}</div>
                <div class="mb-1"><a href="tel:${client.phone}" style="text-decoration:none">${client.phone}</a></div>
                <div class="mb-1">${client.address ? "Адрес: " + client.address : ''}</div>
                <div class="mb-1">${client.reminderDate ? '<span class="badge bg-info text-dark">Напомнить: ' + client.reminderDate + '</span>' : ''}</div>
                <div class="d-none d-md-block">
                    ${fieldRow("Образец", getYesNoText(client.sampleFamiliarization))}
                    ${fieldRow("Ассортимент", getConsultationText(client.assortmentConsultation))}
                    ${fieldRow("Новинки", getConsultationText(client.newProductsConsultation))}
                    ${fieldRow("Предложение", getProposalText(client.proposalStatus))}
                    ${fieldRow("Раскрой", getProposalText(client.disclosureStatus))}
                    ${fieldRow("Доставка", client.deliveryDetails)}
                    ${fieldRow("Упаковка", client.packagingDetails)}
                    ${fieldRow("Петли", client.hingeDetails)}
                    ${fieldRow("Направляющие", client.guideDetails)}
                    ${fieldRow("Подъемные механизмы", client.liftMechanismDetails)}
                    ${fieldRow("Ручки", client.handleDetails)}
                    ${fieldRow("Опоры / Ножки", client.standSupportDetails)}
                    ${fieldRow("Объем/мес", client.monthlyPurchaseVolume)}
                    ${fieldRow("Текущие товары", client.currentProducts)}
                    ${fieldRow("Открыт к смене товаров", client.openToChangeProducts)}
                    ${fieldRow("Решение клиента", client.clientDecision)}
                    ${fieldRow("След.шаги", client.nextSteps)}
                    ${fieldRow("Интерес", client.clientInterest)}
                    ${fieldRow("Перспектива", client.dealPerspective)}
                </div>
            </div>
            <div class="d-flex flex-column" style="min-width:110px;">
                <div class="d-flex flex-row flex-md-column mt-1">
                    <button class="btn btn-sm btn-warning edit-client mb-2">Изменить</button>
                    <button class="btn btn-sm btn-danger delete-client mb-2">Удалить</button>
                </div>
            </div>
            <div class="d-block d-md-none mt-2 w-100">
                ${fieldRow("Образец", getYesNoText(client.sampleFamiliarization))}
                ${fieldRow("Ассортимент", getConsultationText(client.assortmentConsultation))}
                ${fieldRow("Новинки", getConsultationText(client.newProductsConsultation))}
                ${fieldRow("Предложение", getProposalText(client.proposalStatus))}
                ${fieldRow("Раскрой", getProposalText(client.disclosureStatus))}
                ${fieldRow("Доставка", client.deliveryDetails)}
                ${fieldRow("Упаковка", client.packagingDetails)}
                ${fieldRow("Петли", client.hingeDetails)}
                ${fieldRow("Направляющие", client.guideDetails)}
                ${fieldRow("Подъемные механизмы", client.liftMechanismDetails)}
                ${fieldRow("Ручки", client.handleDetails)}
                ${fieldRow("Опоры / Ножки", client.standSupportDetails)}
                ${fieldRow("Объем/мес", client.monthlyPurchaseVolume)}
                ${fieldRow("Текущие товары", client.currentProducts)}
                ${fieldRow("Открыт к смене товаров", client.openToChangeProducts)}
                ${fieldRow("Решение клиента", client.clientDecision)}
                ${fieldRow("След.шаги", client.nextSteps)}
                ${fieldRow("Интерес", client.clientInterest)}
                ${fieldRow("Перспектива", client.dealPerspective)}
            </div>
        </div>
    `;

    card.innerHTML = cardContent;

    card.querySelector('.edit-client').addEventListener('click', (e) => {
        e.preventDefault();
        if (onEdit) onEdit();
    });
    card.querySelector('.delete-client').addEventListener('click', (e) => {
        e.preventDefault();
        if (onDelete) onDelete();
    });

    return card;
}

