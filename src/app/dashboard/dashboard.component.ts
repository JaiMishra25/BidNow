import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

interface Auction {
  id?: string;
  title: string;
  imageUrl?: string;
  info?: string;
  timeLeft: string;
  startTime?: Date;
  endTime?: Date;
  currentBid?: number;
  minimumBid?: number;
  seller?: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, MatSnackBarModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  upcomingAuctions: Auction[] = [];
  currentAuctions: Auction[] = [];
  searchQuery: string = '';
  filteredUpcomingAuctions: Auction[] = [];
  filteredCurrentAuctions: Auction[] = [];
  timerInterval: any;

  // For adding and managing auctions
  newAuction: Auction = {
    title: '',
    info: '',
    currentBid: 0,
    minimumBid: 0,
    imageUrl: '',
    timeLeft: '',
  };
  showAddAuctionForm: boolean = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.generateDynamicAuctions();
    this.filteredUpcomingAuctions = [...this.upcomingAuctions];
    this.filteredCurrentAuctions = [...this.currentAuctions];
    this.timerInterval = setInterval(() => this.updateTimers(), 1000);
  }

  generateDynamicAuctions(): void {
    const now = new Date();
    // Upcoming Auctions
    this.upcomingAuctions = [
      {
        id: '1',
        title: 'Painting Auction',
        info: 'Starting at $100',
        imageUrl: 'images/painting.jpg', // Image path for Painting Auction
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
      {
        id: '2',
        title: 'Antique Auction',
        info: 'Starting at $500',
        imageUrl: 'images/antique.jpg', // Image path for Antique Auction
        startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
      {
        id: '3',
        title: 'Modern Art Auction',
        info: 'Starting at $200',
        imageUrl: 'images/digital-art.jpg', // Image path for Modern Art Auction
        startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
      {
        id: '4',
        title: 'Rare Collectibles Auction',
        info: 'Starting at $1000',
        imageUrl: 'images/clock.jpg', // Image path for Rare Collectibles Auction
        startTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
    ];
    // Current Auctions
    this.currentAuctions = [
      {
        id: '5',
        title: 'Car Auction',
        info: 'Luxury cars on auction',
        currentBid: 15000,
        imageUrl: 'images/car.jpg', // Image path for Car Auction
        endTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
      {
        id: '6',
        title: 'Jewelry Auction',
        info: 'Exquisite jewelry pieces',
        currentBid: 5000,
        imageUrl: 'images/jewelry.jpg', // Image path for Jewelry Auction
        endTime: new Date(now.getTime() + 12 * 60 * 60 * 1000), 
        timeLeft: '',
      },
      {
        id: '7',
        title: 'Tech Gadgets Auction',
        info: 'Latest gadgets at great prices',
        currentBid: 2000,
        imageUrl: 'images/tech.jpg', // Image path for Tech Gadgets Auction
        endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
      {
        id: '8',
        title: 'Luxury Watch Auction',
        info: 'Rare luxury watches on sale',
        currentBid: 8000,
        imageUrl: 'images/luxury-watch.jpg', // Image path for Luxury Watch Auction
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        timeLeft: '',
      },
    ];
  }

  toggleAddAuctionForm(): void {
    this.showAddAuctionForm = !this.showAddAuctionForm;
  }

  addAuction(): void {
    if (!this.newAuction.title || !this.newAuction.info || !this.newAuction.minimumBid) {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
      return;
    }
    const newAuction: Auction = {
      ...this.newAuction,
      id: `auction_${Date.now()}`,
      startTime: new Date(),
      timeLeft: '7d 0h 0m 0s',
    };
    this.currentAuctions.push(newAuction);
    this.filteredCurrentAuctions = [...this.currentAuctions];
    this.toggleAddAuctionForm();
    this.snackBar.open('Auction added successfully!', 'Close', { duration: 3000 });
  }

  deleteAuction(auction: Auction): void {
    this.currentAuctions = this.currentAuctions.filter((a) => a.id !== auction.id);
    this.upcomingAuctions = this.upcomingAuctions.filter((a) => a.id !== auction.id);
    this.updateFilteredAuctions();
    this.snackBar.open('Auction deleted successfully.', 'Close', { duration: 3000 });
  }

  updateFilteredAuctions(): void {
    this.filteredCurrentAuctions = [...this.currentAuctions];
    this.filteredUpcomingAuctions = [...this.upcomingAuctions];
  }

  updateTimers(): void {
    const now = new Date();
    const formatTime = (ms: number): string => {
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const seconds = Math.floor((ms / 1000) % 60);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const updateTime = (auction: Auction, key: 'startTime' | 'endTime') => {
      if (!auction[key]) return;
      const diff = auction[key]!.getTime() - now.getTime();
      auction.timeLeft = diff > 0 ? formatTime(diff) : 'Expired';
    };

    this.upcomingAuctions.forEach((auction) => updateTime(auction, 'startTime'));
    this.currentAuctions.forEach((auction) => updateTime(auction, 'endTime'));
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredUpcomingAuctions = this.upcomingAuctions.filter((a) =>
      a.title.toLowerCase().includes(query)
    );
    this.filteredCurrentAuctions = this.currentAuctions.filter((a) =>
      a.title.toLowerCase().includes(query)
    );
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newAuction.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onPlaceBid(auction: Auction): void {
    const bidAmount = prompt(`Enter your bid for ${auction.title}. Current bid is $${auction.currentBid || 0}`);
    if (bidAmount) {
      const bid = parseFloat(bidAmount);
      if (isNaN(bid) || bid <= (auction.currentBid || 0)) {
        this.snackBar.open('Invalid bid amount. It must be higher than the current bid.', 'Close', { duration: 3000 });
      } else {
        auction.currentBid = bid;
        this.snackBar.open(`Bid of $${bid} placed successfully on ${auction.title}`, 'Close', { duration: 3000 });
      }
    }
  }

  onBid(auction: Auction): void {
    alert(`Reminder set for auction: ${auction.title}`);
  }

  logout(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
