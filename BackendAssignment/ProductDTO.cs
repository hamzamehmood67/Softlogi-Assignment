namespace BackendAssignment
{
    public class ProductDTO
    {
       
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public decimal Price { get; set; }
            public int Quantity { get; set; }
            public string? Tags { get; set; } // Store tags as comma-separated values
         public List<int>? categories { get; set; }
       
    }
}
