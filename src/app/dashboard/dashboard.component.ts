import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Auction {
  title: string;
  imageUrl?: string;
  info?: string;
  timeLeft: string;
  startTime?: string;
  endTime?: string;
  currentBid?: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  upcomingAuctions: Auction[] = [
    { title: 'Painting Auction', startTime: '2024-11-21T15:00:00', info: 'Starting at $100', imageUrl: 'images/painting.jpg', timeLeft: '' },
    { title: 'Antique Auction', startTime: '2024-11-24T18:00:00', info: 'Starting at $500', imageUrl: 'images/antique.jpg', timeLeft: '' },
    { title: 'Classic Book Auction', startTime: '2024-11-23T10:00:00', info: 'Rare books up for grabs', imageUrl: 'images/book.jpg', timeLeft: '' },
    { title: 'Digital Art Auction', startTime: '2024-11-27T14:00:00', info: 'Limited edition NFTs', imageUrl: 'images/digital-art.jpg', timeLeft: '' },
  ];
 
  currentAuctions: Auction[] = [
    { title: 'Car Auction', endTime: '2024-11-18T18:00:00', currentBid: '$15,000', imageUrl: 'images/car.jpg', info: 'Luxury cars on auction', timeLeft: '' },
    { title: 'Jewelry Auction', endTime: '2024-11-18T20:00:00', currentBid: '$5,000', imageUrl: 'images/jewelry.jpg', info: 'Exquisite jewelry pieces', timeLeft: '' },
    { title: 'Tech Gadget Auction', endTime: '2024-11-18T22:00:00', currentBid: '$800', imageUrl: 'images/tech.jpg', info: 'Latest gadgets and devices', timeLeft: '' },
    { title: 'Home-Appliance Auction', endTime: '2024-11-18T12:00:00', currentBid: '$1,200', imageUrl: 'images/appliance.jpg', info: 'Premium home appliances', timeLeft: '' },
  
  ];
  
  searchQuery: string = '';
  filteredUpcomingAuctions: Auction[] = [];
  filteredCurrentAuctions: Auction[] = []; 
  timerInterval: any;
 
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredUpcomingAuctions = [...this.upcomingAuctions];
    this.filteredCurrentAuctions = [...this.currentAuctions];
    this.timerInterval = setInterval(() => this.updateTimers(), 1000);
    this.updateTimers();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  updateTimers(): void {
    const now = new Date();

    const updateAuctionTime = (auction: Auction, dateKey: 'startTime' | 'endTime') => {
      if (!auction[dateKey]) return;
      const target = new Date(auction[dateKey]!);
      const diff = target.getTime() - now.getTime();
      auction.timeLeft = diff > 0 ? this.formatTime(diff) : 'Expired';
    };

    this.upcomingAuctions.forEach((a) => updateAuctionTime(a, 'startTime'));
    this.currentAuctions.forEach((a) => updateAuctionTime(a, 'endTime'));
  }

  formatTime(ms: number): string {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
  onBid(auction: Auction): void {
    alert(`Reminder set for auction: ${auction.title}`);
  }
  
  onPlaceBid(auction: Auction): void {
    alert(`Place bid for: ${auction.title}`);
  }
  

  logout(): void {
    this.router.navigate(['/']);
  }
}
