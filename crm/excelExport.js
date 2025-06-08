import { getYesNoText, getConsultationText, getProposalText } from './fieldFormatters.js';

export function exportClientsToExcel(clients) {
    // Проверка наличия библиотек
    if (!window.XLSX || !window.XLSX.utils) {
        alert('Ошибка: библиотека SheetJS не загружена. Проверьте подключение xlsx.js.');
        console.error('SheetJS library is not loaded.');
        return;
    }
    if (!window.saveAs) {
        alert('Ошибка: библиотека FileSaver.js не загружена.');
        console.error('FileSaver.js library is not loaded.');
        return;
    }

    // Defensive: fallback in case called with undefined/null
    if (!Array.isArray(clients)) clients = [];
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
    const rows = clients.map(client => [
        client?.name || '',
        client?.phone || '',
        client?.reminderDate || '',
        client?.address || '',
        getYesNoText(client?.sampleFamiliarization),
        getConsultationText(client?.assortmentConsultation),
        getConsultationText(client?.newProductsConsultation),
        getProposalText(client?.proposalStatus),
        getProposalText(client?.disclosureStatus),
        client?.deliveryDetails || '',
        client?.packagingDetails || '',
        client?.hingeDetails || '',
        client?.guideDetails || '',
        client?.liftMechanismDetails || '',
        client?.handleDetails || '',
        client?.standSupportDetails || '',
        client?.monthlyPurchaseVolume || '',
        client?.currentProducts || '',
        client?.openToChangeProducts || '',
        client?.clientDecision || '',
        client?.nextSteps || '',
        client?.clientInterest || '',
        client?.dealPerspective || ''
    ]);
    const worksheet = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
    // Adaptive column widths
    worksheet['!cols'] = [
        { wch: 18 }, // Имя
        { wch: 18 }, // Телефон
        { wch: 15 }, // Дата напоминания
        { wch: 32 }, // Адрес
        { wch: 18 },
        { wch: 26 },
        { wch: 26 },
        { wch: 18 },
        { wch: 18 },
        { wch: 21 },
        { wch: 18 },
        { wch: 18 },
        { wch: 22 },
        { wch: 24 },
        { wch: 18 },
        { wch: 20 },
        { wch: 24 },
        { wch: 22 },
        { wch: 20 },
        { wch: 24 },
        { wch: 26 },
        { wch: 26 },
        { wch: 26 }
    ];
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, worksheet, "Клиенты");
    const excelBuffer = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    window.saveAs(data, "crm_clients.xlsx");
}
