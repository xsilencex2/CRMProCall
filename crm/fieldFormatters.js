export function getYesNoText(value) {
    return value === 'yes' ? 'Да' : (value === 'no' ? 'Нет' : '');
}
export function getConsultationText(value) {
    return value === 'consulted' ? 'Проконсультирован' : (value === 'not_consulted' ? 'Не Проконсультирован' : '');
}
export function getProposalText(value) {
    return value === 'proposed' ? 'Предложили' : (value === 'not_proposed' ? 'Не предложили' : '');
}

