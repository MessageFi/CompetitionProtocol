// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ITeller {
    function calculateTickets(uint256 amount, address ticketCoin) external view returns(uint256);
}