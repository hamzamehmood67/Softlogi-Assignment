using BackendAssignment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            var products= await _context.Products.ToListAsync();
            List<ProductDTO> result= new List<ProductDTO>();
            foreach(var product in products)
            {

                List<int> cat = _context.ProductCategories.Where(pc => pc.ProductID == product.ProductID).Select(pc => pc.CategoryID).ToList();
                var dto = new ProductDTO
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    Price = product.Price,
                    Tags = product.Tags,
                    Quantity = product.Quantity,
                    categories = cat
                };
                result.Add(dto);
            }

            return Ok(result);

        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductDTO productDto)
        {
            var product = new Product
            {
                ProductName = productDto.ProductName,
                Price = productDto.Price,
                Quantity = productDto.Quantity,
                Tags = productDto.Tags
            };


            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            foreach (var categoryId in productDto.categories)
            {
                var productCategory = new ProductCategory
                {
                    ProductID = product.ProductID,
                    CategoryID = categoryId
                };
                _context.ProductCategories.Add(productCategory);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.ProductID }, product);
        }
        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {id} not found." });
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDTO productDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == id);
            if (product == null)
            {
                return NotFound();
            }
            product.ProductName = productDto.ProductName;
            product.Price = productDto.Price;
            product.Quantity = productDto.Quantity;
            product.Tags = productDto.Tags;

            var productCategories = _context.ProductCategories
                                .Where(pc => pc.ProductID == id)
                                .ToList();
            // Clear old categories and add new ones
            _context.ProductCategories.RemoveRange(productCategories);

            foreach (var categoryId in productDto.categories)
            {
                var productCategory = new ProductCategory
                {
                    ProductID = product.ProductID,
                    CategoryID = categoryId
                };
                _context.ProductCategories.Add(productCategory);
            }


            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            var productCategories = _context.ProductCategories
                                .Where(pc => pc.ProductID == id)
                                .ToList();
            // Clear old categories and add new ones
            _context.ProductCategories.RemoveRange(productCategories);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
