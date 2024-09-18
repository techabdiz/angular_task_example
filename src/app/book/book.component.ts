import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  ngOnInit(): void {
    this.loadBookSnapShot()
  }

  books: Book[] = [];  
  book: Book =  {
    id: 0,
    title: "",
    author: ''
  };

  resetBook() { 
    this.book.author =""
    this.book.id = 0
    this.book.title=""
  }

  saveBook() { 
    this.books.push(Object.assign({}, this.book))
    this.snapShotBook()
    this.resetBook()
  }

  snapShotBook() { 
    localStorage.setItem('books', JSON.stringify(this.books))
  }

  loadBookSnapShot() { 
    let snapshot = localStorage.getItem('books')
    this.books = (snapshot)? JSON.parse(snapshot):[]
  }

  deleteBookAtIndex(i: number) { 
    this.books.splice(i, 1)
    this.snapShotBook()
  }
}
