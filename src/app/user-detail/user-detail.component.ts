import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule

interface Auction {
  id: string;
  title: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  numberOfBids: number;
  participatedAuctions: Auction[];
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports: [CommonModule],  // Add CommonModule here
})
export class UserDetailComponent implements OnInit {
  userId!: string;
  userDetails!: User;

  // Mock user data
  private users: User[] = [
    {
      id: 'john.doe@example.com',
      name: 'John Doe',
      address: '123 Elm Street, Springfield',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      numberOfBids: 15,
      participatedAuctions: [
        { id: '1', title: 'Antique Vase Auction', status: 'completed' },
        { id: '2', title: 'Modern Art Auction', status: 'completed' },
      ],
    },
    {
      id: 'jane.smith@example.com',
      name: 'Jane Smith',
      address: '456 Oak Avenue, Metropolis',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      numberOfBids: 10,
      participatedAuctions: [
        { id: '3', title: 'Classic Car Auction', status: 'completed' },
        { id: '4', title: 'Vintage Jewelry Auction', status: 'completed' },
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch the 'id' parameter from the route
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    // Find the user based on the id
    const user = this.users.find((u) => u.id === this.userId);
    if (user) {
      this.userDetails = user;
    } else {
      console.error(`User with id ${this.userId} not found.`);
    }
  }
}
