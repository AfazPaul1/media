import Button1 from "./Button1"
import AddIcon from '@mui/icons-material/Add';
interface header {
    loading: boolean;
    typeOfItem: string,
    name: string,
    onClick: () => void
}
export function Header({loading, typeOfItem, name, onClick}: header) {
    return <>
            <h3 className="text-lg font-bold">{typeOfItem} {name}</h3>
            <Button1 loading={loading}  onClick={onClick}>
                <AddIcon></AddIcon>
            </Button1>
    </>
    }