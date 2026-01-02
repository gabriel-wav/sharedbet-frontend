import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useState } from 'react';
import { FACTORY_ADDRESS, FACTORY_ABI, USDC_ADDRESS, USDC_ABI } from '../constants/abis';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);

  // 1. Função para pedir Tokens de teste (MINT)
  async function handleMint() {
    if (!address) return;
    setLoading(true);
    try {
      await writeContractAsync({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: 'mint',
        args: [address, parseUnits('1000', 18)],
      });
      alert("Recebeste 1000 Mock USDC!");
    } catch (e) {
      console.error(e);
      alert("Erro ao pedir tokens");
    }
    setLoading(false);
  }

  // 2. Função para criar uma nova Estratégia
  async function handleCreateStrategy() {
    setLoading(true);
    try {
      const tx = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createStrategy',
        args: [USDC_ADDRESS, BigInt(1000)], // asset (USDC), 10% fee
      });
      console.log("Tx enviada:", tx);
      alert("Estratégia criada! Verifica a consola.");
    } catch (e) {
      console.error(e);
      alert("Erro ao criar estratégia");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-8">
      <h1 className="text-4xl font-bold">SharedBet DApp</h1>
      
      {/* Botão de Ligar Carteira */}
      <div>
        {isConnected ? (
          <div className="flex gap-4">
            <div className="p-3 bg-green-600 text-white rounded">
              Conectado: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            <button 
              onClick={() => disconnect()}
              className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Desconectar
            </button>
          </div>
        ) : (
          <button 
            onClick={() => connect({ connector: connectors[0] })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold"
          >
            Conectar Carteira
          </button>
        )}
      </div>

      {address && (
        <div className="flex flex-col gap-4">
          <div className="p-6 border rounded-lg bg-gray-800 text-white w-96">
            <h2 className="text-xl mb-4 font-bold">1. Setup Inicial</h2>
            <button 
              onClick={handleMint}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 p-2 rounded mb-2 disabled:opacity-50"
            >
              {loading ? 'A processar...' : 'Pedir 1000 Mock USDC'}
            </button>
            <p className="text-xs text-gray-400">Como estamos na rede local, precisas de criar dinheiro falso primeiro.</p>
          </div>

          <div className="p-6 border rounded-lg bg-gray-800 text-white w-96">
            <h2 className="text-xl mb-4 font-bold">2. Gestor</h2>
            <button 
              onClick={handleCreateStrategy}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded disabled:opacity-50"
            >
              Criar Nova Estratégia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}