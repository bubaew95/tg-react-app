export const telegramButton = (text, tg, stateButton) => {
    if(stateButton) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.show(); 
        tg.MainButton.setParams({ text })
    }
}