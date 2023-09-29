// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import "openzeppelin/token/ERC1155/ERC1155.sol";
// import "openzeppelin-contracts.git/contracts/token/ERC1155/ERC1155.sol";
import "../../../lib/openzeppelin-contracts.git/contracts/token/ERC1155/ERC1155.sol";

contract SchoolsNFT is ERC1155 {
    string public name;
    string public symbol;
    address public admin;
    uint256 totalTokenId = 0;
    mapping(bytes => string) public daysIdToUri;
    mapping(bytes => uint256) public daysIdToTokenId;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _admin
    ) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
        admin = _admin;
    }

    modifier onlyOwner() {
        require(msg.sender == admin, "Not permitted");
        _;
    }

    function mint(
        address _to,
        bytes memory _daysId,
        uint256 _amount
    ) public onlyOwner {
        uint256 tokenId = daysIdToTokenId[_daysId];
        _mint(_to, tokenId, _amount, "");
    }

    function batchMintForDay(
        bytes memory _dayId,
        address[] memory _students,
        uint256[] memory _amount
    ) public onlyOwner {
        require(_students.length == _amount.length, "Length mismatch");

        for (uint256 i = 0; i < _students.length; i++) {
            uint256 tokenId = daysIdToTokenId[_dayId];
            _mint(_students[i], tokenId, _amount[i], "");
        }
    }

    function setDayUri(bytes memory id, string memory _uri) public onlyOwner {
        daysIdToTokenId[id] = totalTokenId;
        daysIdToUri[id] = _uri;
        totalTokenId++;
    }

    function getDayUri(bytes memory id) public view returns (string memory _dayUri) {
        _dayUri = daysIdToUri[id];
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public override {
        revert("TOKEN IS SOUL BUND");

    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data) public override {
        revert("TOKEN IS SOUL BUND");
    }
}




































// pragma solidity ^0.8.13;

// import "openzeppelin/token/ERC1155/ERC1155.sol";

// // Change to InstitutionNFT
// contract SchoolsNFT is ERC1155 {

//     //////////////////////////////////
//     ////// STATE VARIABLES ///////////
//     //////////////////////////////////

//     //@notice name: Institution name
//     string public name;

//     //@notice symbol: Institution symbol
//     string public symbol;

//     //@notice admin: Institution Admin
//     address public admin;

//     //@dev totalClasses: total number of classes
//     uint256 public totalClasses;

//     //@notice tokenIdToUri: maps a tokenId to its Uri
//     mapping(uint256 => string) public tokenIdToUri;

//     //@notice classIdToTokenId: maps a classId to the tokenId associated with it
//     mapping(bytes => uint256) classIdToTokenId;



//     ///////////////////////////////////
//     //////////// EVENTS ///////////////
//     ///////////////////////////////////


//     //@params _classId the classId of the class (secret Id)
//     //@params _uri the Uri associated with the classId
//     event ClassIdUriSet(bytes _classId, string _uri);


//     //@params _classId the classId of the class
//     //@params _totalTokensMinted the total number of tokens minted
//     event BatchMintComplete(bytes _classId, uint256 _totalTokensMinted);


//     //@params _classId the classId of the class
//     //@params _to the address to mint token to
//     //@params _amount the amount of token to mint
//     event TokenMinted(bytes _classId, address _to, uint256 _amount);


//     //@params _classId the classId whose Uri was changed
//     //@params _newUri new Uri associated with the classId
//     event UriChanged(bytes _classId, string _newUri);





//     ////////////////////////////////////
//     ////////// FUNCTIONS ///////////////
//     ////////////////////////////////////


//     //@dev onlyOwner modifier
//     modifier onlyOwner {
//         require(msg.sender == admin, "Not Admin");
//         _;
//     }


//     //@dev initializes state variables at deployment
//     //@params _name The name of the institution as well as the NFT
//     //@params _symbol The symbol of the institution as well as the NFT
//     //@params _uri The URI of the institution as well as the NFT
//     //@params _admin The address of the institution admin
//     constructor(
//         string memory _name,
//         string memory _symbol,
//         string memory _uri,
//         address _admin
//     ) ERC1155(_uri) {
//         name = _name;
//         symbol = _symbol;
//         admin = _admin;
//     }


//     //@notice Mints _amount number of _classId Nft to the _to address
//     //@params _to: address to mint Nft to
//     //@params _classId: classId of Nft to mint
//     //@params _amount: amount of Nft to mint (typically 1 per class)
//     function mint(
//         address _to,
//         bytes calldata _classId,
//         uint256 _amount
//     ) public onlyOwner {

//         require(classIdToTokenId[_classId] != 0, "Class doesn't exist");

//         uint256 _tokenId = classIdToTokenId[_classId];
//         _mint(_to, _tokenId, _amount, "");

//         emit TokenMinted(_classId, _to, _amount);
//     }


//     //@notice enables a mentor batch mint the NFT for a particular class
//     //@params _classId is the Id for the class to batch mint
//     //@params _students is an array of all students to mint the NFT to
//     //@params _amount is the amount of NFT to mint to each student which is typically 1
//     function batchMintNFTForClass(
//         bytes calldata _classId,
//         address[] memory _students,
//         uint256[] memory _amount
//     ) public onlyOwner {

//         require(_students.length == _amount.length, "Length mismatch");
//         require(classIdToTokenId[_classId] != 0, "Class doesn't exist");

//         uint256 _tokenId = classIdToTokenId[_classId];

//         for (uint256 i = 0; i < _students.length; i++) {
//             _mint(_students[i], _tokenId, _amount[i], "");
//         }

//         emit BatchMintComplete(_classId, _students.length);
//     }


//     //@notice creates an NFT for a class
//     //@params classId in bytes
//     //@params _uri The Uri to associate with the classId
//     function createClass(bytes calldata classId, string memory _uri) public onlyOwner {

//         require(classIdToTokenId[classId] == 0, "Class ID already used");

//         totalClasses++;

//         classIdToTokenId[classId] = totalClasses;

//         tokenIdToUri[totalClasses] = _uri;

//         emit ClassIdUriSet(classId, _uri);

//     }



//     //@notice fetches the URI for the classId given
//     //@params classId the classId of the class youu want to get the Uri
//     //@returns _classUri the class Uri of the classId passed to the function
//     function getClassUri(bytes calldata classId) public view returns (string memory _classUri) {

//         uint256 _tokenId = classIdToTokenId[classId];

//         _classUri = tokenIdToUri[_tokenId];

//     }


//     //@notice fetches the tokenId for a particular class
//     //@params _classId class to fetch tokenId for
//     //@returns _tokenId the tokenId associated with the classId
//     function getTokenIdForClass(bytes calldata _classId) public view returns (uint256 _tokenId) {
//         _tokenId = classIdToTokenId[_classId];
//     }


//     //@dev changes the class Uri for a classId
//     //@params _classId classId to change Uri for
//     //@params _newUri new Uri to associate to classId
//     function changeClassUri(bytes calldata _classId, string memory _newUri) public onlyOwner {

//         require(classIdToTokenId[_classId] != 0, "No Uri for Class ID");

//         uint256 _tokenId = classIdToTokenId[_classId];

//         tokenIdToUri[_tokenId] = _newUri;

//         emit UriChanged(_classId, _newUri);
//     }


// }