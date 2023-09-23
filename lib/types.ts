export type Couple = {
    id: number,
    leader: Dancer,
    follower: Dancer
}
export type Dancer = { 
    id: number; 
    firstName: string; 
    lastName: string; 
    role: Role; 
};
type Role = 'follower' | 'leader' | 'solo';
