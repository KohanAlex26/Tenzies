export default function Dice(props){
    const styles={
        backgroundColor: props.isHeld? "#59E391":"#FFFFFF"
    }
    return(
        <div className="dice" style={styles} onClick={props.handleClick}>
            <h2 className="dice-num">{props.value}</h2>
        </div>
    )
}