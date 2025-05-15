import { atom } from "recoil";

export const nftsAtom = atom<any[]>({
    key: "layersAtom",
    default: [
        {
            imageUrl: "https://res.cloudinary.com/drwf6bs9h/image/upload/v1747312367/nfts/xyz_XYZ/XYZ0.png",
            metadata : {
                name: "firstone #1",
                symbol: "FTWO",
                image: "https://res.cloudinary.com/drwf6bs9h/image/upload/v1747312367/nfts/xyz_XYZ/XYZ0.png",
                description: "all the first found layers",
                collection: {name: 'firstone', symbol: 'FTWO'},
                attributes: [
                    {trait_type: 'background', value: "NewPunkBlue"},
                    {trait_type: 'fur', value: 'Blue'},
                    {trait_type: 'mouth', value: 'BoredDagger'},
                    {trait_type: 'clothes', value: 'Body5'},
                    {trait_type: 'eyes', value:  'Blindfold'},
                    {trait_type: 'cap', value: 'TrippyCaptainsHat1'}
                ]
            },
        }
    ]
});


// One sample of nft
// {
//     imageUrl: "https://res.cloudinary.com/drwf6bs9h/image/upload/v1746859797/firstone_FTWO/nft_0.png",
//     metadata : {
//         name: "firstone #1",
//         symbol: "FTWO",
//         image: "https://res.cloudinary.com/drwf6bs9h/image/upload/v1746859797/firstone_FTWO/nft_0.png",
//         description: "all the first found layers",
//         collection: {name: 'firstone', symbol: 'FTWO'},
//         attributes: [
//             {trait_type: 'background', value: 'ArmyGreen'},
//             {trait_type: 'fur', value: 'Black'},
//             {trait_type: 'mouth', value: 'Bored'},
//             {trait_type: 'clothes', value: 'Body'},
//             {trait_type: 'eyes', value: '3D'},
//             {trait_type: 'cap', value: 'TrippyCaptainsHat'}
//         ]
//     }
// }