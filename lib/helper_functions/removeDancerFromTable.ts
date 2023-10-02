import { PositionScoreTable } from "../types";

export function removeDancerFromTable(placedId: number, scoreTable: PositionScoreTable) {
    return scoreTable.map(position => {
        return position.filter(id => id !== placedId);
    });
}
