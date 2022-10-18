import { useTelegram } from "./useTelegram";


export const useTelegramButton = ({items, text}) => {

    const {tg} = useTelegram();

    useEffect(() => {
        if(items.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show(); 
            tg.MainButton.setParams({ text })
        }
    }, [items])

    return null;
}