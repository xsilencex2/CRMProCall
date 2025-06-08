export function fillFormWithClient(client) {
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
}

// Set form to "edit" state for this client.
// On submit: update client, clear form, restore handler, call callback after completion
export function setupEditMode(client, db, onComplete) {
    const form = document.getElementById('clientForm');
    const origSubmit = form.onsubmit;
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
        await db.updateClient(updatedClient);
        form.reset();
        form.onsubmit = origSubmit;
        if (typeof onComplete === 'function') onComplete();
    };
}