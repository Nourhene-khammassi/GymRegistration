


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Payment } from 'src/app/models/payement';
import { User } from 'src/app/models/register.model';
import { ApiService } from 'src/app/service/api.service';
import { PaymentService } from 'src/app/service/payement.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  displayedColumns: string[] = ['month', 'status']; // Define the displayed columns

  selectedUserId: number | undefined; // Ajout d'une variable pour stocker l'ID de l'utilisateur sélectionné
  userPayments: any[] = []; // Nouvelle variable pour stocker les paiements de l'utilisateur sélectionné
  selectedUserPayments: any[] = []; // Variable pour stocker les détails des paiements de l'utilisateur sélectionné

  paidMonthsText: string = ''; // Variable pour stocker les mois payés sous forme de texte
  unpaidMonthsText: string = ''; // Variable pour stocker les mois non payés sous forme de texte
  usersWithPayments: any[] = []; // Une liste pour stocker les utilisateurs avec leurs informations de paiement



  payments!: any
  public users!: User[];
  dataSource!: MatTableDataSource<User>;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiService, // Injectez le service*
    private paymentService: PaymentService // Injectez le service




  ) { }

  ngOnInit() {

    this.getUsers();
    this.loadUserPayments(); // Cette fonction chargera les paiements de l'utilisateur sélectionné

    this.paymentForm = this.formBuilder.group({
      user: ['', Validators.required],
      month: ['', Validators.required],
      paid: [false]
    });


  }
  makePayment() {
    const paymentDetails = this.paymentForm.value;

    const selectedUserId = paymentDetails.user; // Récupérer l'ID de l'utilisateur sélectionné

    // Créer le nouvel objet de paiement à envoyer au serveur
    const newPayment: any = {
      user: selectedUserId,
      paid: paymentDetails.paid,
      month: paymentDetails.month
    };

    this.paymentService.makePayment(newPayment).subscribe((response: any) => {
      console.log('Payment successful:', response);

      // Mettre à jour les paiements après l'ajout du nouveau paiement
      this.paymentService.getPaymentsByUserId(selectedUserId).subscribe((payments: any[]) => {
        this.userPayments = payments.map(payment => ({
          month: payment.month,
          status: payment.paid ? 'Paid' : 'Not Paid'
        }));

        // Filtrer les paiements de l'utilisateur sélectionné
        const paidMonths = this.userPayments.filter(payment => payment.status === 'Paid').map(payment => payment.month);
        const unpaidMonths = this.userPayments.filter(payment => payment.status === 'Not Paid').map(payment => payment.month);

        this.paidMonthsText = paidMonths.length > 0 ? paidMonths.join(', ') : 'No paid months';
        this.unpaidMonthsText = unpaidMonths.length > 0 ? unpaidMonths.join(', ') : 'No unpaid months';
      });
    }, (error: any) => {
      console.error('Payment error:', error);
    });
  }




  getPaymentsForUser(userId: number) {
    console.log("userID", userId)
    this.paymentService.getPaymentsByUserId(userId).subscribe((payments: Payment[]) => {
      this.selectedUserPayments = payments.map(payment => ({
        month: new Date(payment.month).toLocaleString('en-us', { month: 'long' }),
        status: payment.paid ? 'Paid' : 'Not Paid'
      }));
      const paidMonths = this.selectedUserPayments
        .filter(payment => payment.status === 'Paid')
        .map(payment => payment.month);

      const unpaidMonths = this.selectedUserPayments
        .filter(payment => payment.status === 'Not Paid')
        .map(payment => payment.month);
      console.log("pay", this.selectedUserPayments)
      this.paidMonthsText = ""
      this.paidMonthsText = paidMonths.length > 0 ? paidMonths.join(', ') : 'No paid months';
      this.unpaidMonthsText = unpaidMonths.length > 0 ? unpaidMonths.join(', ') : 'No unpaid months';
    });
  }



  loadUserPayments() {
    if (this.selectedUserId) {
      this.paymentService.getPaymentsByUserId(this.selectedUserId).subscribe((payments: Payment[]) => {

        this.userPayments = payments.map(payment => ({
          month: payment.month,
          status: payment.paid ? 'Paid' : 'Not Paid'
        }));
        this.dataSource = new MatTableDataSource(this.userPayments); // Mettre à jour la source de données de la table
      });
    }
  }
  getUsers() {
    this.apiservice.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);

        },
        error: (err) => {
          console.log(err);
        }
      })
  }


}  