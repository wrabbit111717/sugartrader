export interface Plan {
    id: number,
    user_id: number,
    client_id: number,
    to_date: string,
    from_date: string,
    memo: string,
    price: string,
    order: number,
    visited: 'Y'|'N',
    takeover: string
}