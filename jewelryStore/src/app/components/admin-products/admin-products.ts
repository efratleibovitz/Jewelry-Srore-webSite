import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { AdminProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ChangeDetectorRef } from '@angular/core'; // ייבוא
@Component({
  selector: 'app-admin-products',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})


export class AdminProducts implements OnInit {
  products: AdminProduct[] = [];
  productForm!: FormGroup;
  selectedProduct: AdminProduct | null = null;
  isEditMode = false;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
        this.initForm();

    this.loadProducts();
  }

  initForm() {
    this.productForm = this.fb.group({
      productId: [0], // חשוב לעריכה
      productName: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      shortDescription: [''],
      longDescription: [''],
      color: ['', Validators.required], // הוסיפי זאת
      categoryId: [1, Validators.required], // ערך 1 כברירת מחדל      image1: ['', Validators.required],
      image1: ['', Validators.required],
      image2: [''],
      dateAdded: [new Date().toISOString().split('T')[0]], // להוסיף כדי שלא יהיה חסר ב-SAVE
      isClassic: [false],
      isTrendy: [false],
      isPearls: [false],
      isStudio: [false],
      justOnline: [false],
      sizes: this.fb.array([]) // מערך דינמי למידות
    });
  }

 loadProducts() {

  this.products = []; // ריקון המערך לפני הטעינה כדי להכריח את אנגולר להתרענן

  this.productService.getAllProducts().subscribe({
    next: (data: AdminProduct[]) => { // הגדרת הטיפוס כאן פותרת שגיאות קומפילציה
      console.log('הנתונים הגיעו מהשרת:', data); // הדפסה לבדיקה
      this.products = data;
    },
    error: (err) => {
      console.error('שגיאה בטעינת מוצרים', err);
    }
  });
}

  // onEdit(product: AdminProduct) {
  //   this.selectedProduct = product;
  //   this.isEditMode = true;
  //   this.sizes.clear();
  //   // מילוי המידות מתוך הנתונים שהגיעו מהשרת
  //   if (product.sizes) {
  //     product.sizes.forEach((s: any) => this.addSize(s.productSize, s.amount));
  //   }
  //     // ממלא את הטופס בערכים של המוצר שנבחר
  //   this.productForm.patchValue(product);
  // }

// onEdit(product: AdminProduct) {
//   this.selectedProduct = product;
//   this.isEditMode = true;
//   this.sizes.clear();

//   if (product.sizes && Array.isArray(product.sizes)) {
//     product.sizes.forEach((s: any) => {
//       // אנחנו בודקים גם אות קטנה וגם גדולה כדי לא לקחת סיכון
//       const sizeVal = (s.productSize || s.ProductSize || '').toString(); // המרה לטקסט
//       const amountVal = s.amount !== undefined ? s.amount : s.Amount || 0;
      
//       this.sizes.push(this.fb.group({
//         productSize: [sizeVal, [Validators.required]],
//         amount: [amountVal, [Validators.required, Validators.min(0)]]
//       }));
//     });
//   }
  
  // אחרי שבנינו את המערך, נטען את שאר השדות
  // this.productForm.patchValue(product);

onEdit(product: AdminProduct) {
  this.selectedProduct = product;
  this.isEditMode = true;
  this.sizes.clear();

  if (product.sizes && Array.isArray(product.sizes)) {
    product.sizes.forEach((s: any) => {
      const sizeVal = (s.productSize || s.ProductSize || '').toString(); // המרה לטקסט
      const amountVal = s.amount !== undefined ? s.amount : (s.Amount || 0);
      
      this.sizes.push(this.fb.group({
        productSize: [sizeVal, [Validators.required]],
        amount: [amountVal, [Validators.required, Validators.min(0)]]
      }));
    });
  }
  this.productForm.patchValue(product);
}
// פתיחת המודאל להוספת מוצר חדש

  onAddNew() {
  this.isEditMode = true;
  this.selectedProduct = null;
  this.sizes.clear(); // חשוב! לנקות את המידות מהעריכה הקודמת
  this.productForm.reset({
    productId: 0,
    productName: '',
    productPrice: 0,
    color: 'זהב',        // ערך ברירת מחדל
    categoryId: 1,      // ערך ברירת מחדל
    shortDescription: '',
    longDescription: '',
    image1: '',
    image2: '',
    isClassic: false,
    isTrendy: false,
    isPearls: false,
    isStudio: false,
    justOnline: false,
    dateAdded: new Date().toISOString().split('T')[0], // תאריך היום כברירת מחדל
    sizes: [] // לאתחל מערך ריק למידות
  });
}

get sizes() {
  return this.productForm.get('sizes') as FormArray;
}



addSize(productSize: string = '', amount: number = 0) {
  this.sizes.push(this.fb.group({
    productSize: [productSize, [Validators.required]],
    amount: [amount, [Validators.required, Validators.min(0)]]
  }));
}


// 4. פונקציה להסרת מידה
removeSize(index: number) {
  this.sizes.removeAt(index);
}

 saveChanges() {
  if (this.productForm.invalid) {
    alert('אנא מלאי את כל שדות החובה (כולל תמונה ראשית)');
    return;
  }

  const rawValue = this.productForm.value;

  if (this.selectedProduct) {
    // --- עריכה ---
    const updatedProduct = { 
      ...rawValue, 
      productId: Number(this.selectedProduct.productId) // וודאי שזה מספר
    };
    
    this.productService.updateProduct(updatedProduct.productId, updatedProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.isEditMode = false;
        alert('המוצר עודכן!');
      },
      error: (err) => console.error(err)
    });

  } else {
    // --- הוספה חדשה ---
    // אנחנו יוצרים אובייקט חדש ללא ה-ID, או עם ID: 0
    const { productId, ...newProductData } = rawValue; // מוציא את ה-ID החוצה
    
    const payload = { 
      ...newProductData,
      productId: 0, // Identity מצפה ל-0 בדרך כלל ב-DTO
      dateAdded: new Date().toISOString().split('T')[0]
    };

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.loadProducts();
        this.isEditMode = false;
        alert('נוסף בהצלחה!');
      },
      error: (err) => {
        console.error('שגיאה:', err);
        // טיפ: אם עדיין יש שגיאה, בדקי ב-Network Tab את ה-Response החדש
      }
    });
  }
}

onFileSelected(event: any, fieldName: string) {
  const file = event.target.files[0];
  if (file) {
    // אנחנו שומרים בטופס רק את השם, כדי שה-DB יוכל להכיל אותו
    this.productForm.patchValue({
      [fieldName]: file.name 
    });

    // לצורך התצוגה המקדימה בלבד (Preview), אפשר להשתמש ב-Base64 במשתנה מקומי
    const reader = new FileReader();
    reader.onload = () => {
       // כאן את יכולה לעדכן משתנה נפרד שמשמש רק ל-SRC של ה-img ב-HTML
    };
    reader.readAsDataURL(file);
  }
}

// מחיקת מוצר עם אישור
onDelete(id: number, name: string) {
  if (confirm(`האם את בטוחה שברצונך למחוק את המוצר "${name}"?`)) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== id);
        alert('המוצר נמחק בהצלחה');
      },
      error: () => alert('שגיאה במחיקת המוצר')
    });
  }
}
}
