namespace Difficulty
{
    public enum SpawnSource
    {
        FixedSequence,
        WeightedBag,
        MercyRescue
    }

    public class SpawnResult
    {
        public BlockShapeSO Shape { get; private set; }
        public SpawnSource Source { get; private set; }
        public bool WasMercyRescue => Source == SpawnSource.MercyRescue;

        public SpawnResult(BlockShapeSO shape, SpawnSource source)
        {
            this.Shape = shape;
            this.Source = source;

        }
    }

}