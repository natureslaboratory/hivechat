export default class Utils
{
    public static getPerchElement(node : HTMLElement, id : string, className : string)
    {
        let array = node.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
        if (array) {
            return Array.from(array).filter(el => el.id.includes(id))[0];
        }
        return null;
    }
}