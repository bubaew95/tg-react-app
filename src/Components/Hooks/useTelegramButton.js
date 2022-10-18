export const telegramButton = (tg, text, stateButton) => {
    if(stateButton) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.show(); 
        tg.MainButton.setParams({ text })
    }
}