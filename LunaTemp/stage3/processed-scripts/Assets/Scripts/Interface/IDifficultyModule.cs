namespace Difficulty
{
    /// <summary>
    /// Interface cho các module trong Difficulty System
    /// Đảm bảo tính nhất quán và dễ mở rộng
    /// </summary>
    public interface IDifficultyModule
    {
        /// <summary>
        /// Khởi tạo module
        /// </summary>
        void Initialize();

        /// <summary>
        /// Reset module (khi restart level)
        /// </summary>
        void Reset();

        /// <summary>
        /// Tên module (để debug)
        /// </summary>
        string ModuleName { get; }
    }
}