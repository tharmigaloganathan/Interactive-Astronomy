export interface PhotoCollection {
    _id: string,
    username: string,
    description: string,
    name: string,
    numberOfRatings: number,
    sumOfRatings: number,
    public: boolean,
    photos: string[]
}
