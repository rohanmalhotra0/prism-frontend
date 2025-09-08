"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CryptoModelingPage() {
  const cryptoTopics = [
    {
      title: "Blockchain Analysis",
      icon: "•",
      description: "Techniques for analyzing blockchain data to understand transaction patterns, network health, and market dynamics.",
      details: {
        howItWorks: "Uses graph theory and statistical analysis to examine blockchain transactions, addresses, and network metrics to extract insights.",
        keyComponents: ["Transaction Analysis", "Address Clustering", "Network Metrics", "Graph Theory", "Statistical Analysis"],
        useCases: ["Market analysis", "Risk assessment", "Compliance monitoring", "Investment research"],
        codeExample: `import pandas as pd
import networkx as nx
import numpy as np

def blockchain_analysis(transaction_data):
    """
    Comprehensive blockchain analysis
    """
    # Transaction volume analysis
    daily_volume = transaction_data.groupby('date')['value'].sum()
    volume_stats = {
        'mean_daily_volume': daily_volume.mean(),
        'volatility': daily_volume.std(),
        'max_daily_volume': daily_volume.max()
    }
    
    # Address analysis
    address_activity = transaction_data.groupby('from_address').size()
    whale_addresses = address_activity[address_activity > address_activity.quantile(0.99)]
    
    # Network graph analysis
    G = nx.from_pandas_edgelist(
        transaction_data, 
        'from_address', 
        'to_address', 
        edge_attr='value'
    )
    
    # Network metrics
    network_metrics = {
        'num_nodes': G.number_of_nodes(),
        'num_edges': G.number_of_edges(),
        'density': nx.density(G),
        'average_clustering': nx.average_clustering(G),
        'transitivity': nx.transitivity(G)
    }
    
    # Centrality measures
    centrality = nx.degree_centrality(G)
    top_central_addresses = sorted(centrality.items(), key=lambda x: x[1], reverse=True)[:10]
    
    return {
        'volume_stats': volume_stats,
        'whale_addresses': whale_addresses,
        'network_metrics': network_metrics,
        'top_central_addresses': top_central_addresses
    }`
      }
    },
    {
      title: "DeFi Protocol Analysis",
      icon: "🏦",
      description: "Analysis of decentralized finance protocols including liquidity pools, yield farming, and automated market makers.",
      details: {
        howItWorks: "Examines protocol metrics, token economics, and user behavior to assess protocol health and investment opportunities.",
        keyComponents: ["Total Value Locked (TVL)", "Liquidity Pools", "Yield Metrics", "Token Economics", "User Activity"],
        useCases: ["Protocol evaluation", "Yield optimization", "Risk assessment", "Investment analysis"],
        codeExample: `def defi_protocol_analysis(protocol_data):
    """
    Analyze DeFi protocol metrics
    """
    # TVL analysis
    tvl_trend = protocol_data.groupby('date')['tvl'].sum()
    tvl_growth = (tvl_trend.iloc[-1] - tvl_trend.iloc[0]) / tvl_trend.iloc[0]
    
    # Liquidity pool analysis
    pool_analysis = {}
    for pool in protocol_data['pool'].unique():
        pool_data = protocol_data[protocol_data['pool'] == pool]
        
        # Calculate pool metrics
        total_liquidity = pool_data['tvl'].sum()
        avg_apy = pool_data['apy'].mean()
        volume_24h = pool_data['volume_24h'].sum()
        
        # Impermanent loss calculation
        price_change = (pool_data['token_a_price'].iloc[-1] - pool_data['token_a_price'].iloc[0]) / pool_data['token_a_price'].iloc[0]
        impermanent_loss = 2 * np.sqrt(price_change) / (1 + price_change) - 1
        
        pool_analysis[pool] = {
            'total_liquidity': total_liquidity,
            'avg_apy': avg_apy,
            'volume_24h': volume_24h,
            'impermanent_loss': impermanent_loss
        }
    
    # Yield farming analysis
    yield_farms = protocol_data[protocol_data['type'] == 'yield_farming']
    farm_metrics = {
        'total_farms': len(yield_farms),
        'avg_apy': yield_farms['apy'].mean(),
        'max_apy': yield_farms['apy'].max(),
        'total_rewards': yield_farms['rewards'].sum()
    }
    
    # Risk metrics
    risk_metrics = {
        'concentration_risk': len(protocol_data['pool'].unique()) / len(protocol_data),
        'volatility': protocol_data['apy'].std(),
        'max_drawdown': (protocol_data['tvl'].cummax() - protocol_data['tvl']).max()
    }
    
    return {
        'tvl_trend': tvl_trend,
        'tvl_growth': tvl_growth,
        'pool_analysis': pool_analysis,
        'farm_metrics': farm_metrics,
        'risk_metrics': risk_metrics
    }`
      }
    },
    {
      title: "Tokenomics Modeling",
      icon: "🪙",
      description: "Mathematical modeling of token economics including supply dynamics, inflation, and value accrual mechanisms.",
      details: {
        howItWorks: "Uses economic models to analyze token supply, demand, and value mechanisms including staking, burning, and governance.",
        keyComponents: ["Supply Dynamics", "Inflation Models", "Staking Rewards", "Burning Mechanisms", "Governance Tokens"],
        useCases: ["Token valuation", "Investment analysis", "Protocol design", "Risk assessment"],
        codeExample: `def tokenomics_modeling(token_data, staking_data, governance_data):
    """
    Comprehensive tokenomics analysis
    """
    # Supply dynamics
    def calculate_supply_dynamics(token_data):
        total_supply = token_data['total_supply'].iloc[-1]
        circulating_supply = token_data['circulating_supply'].iloc[-1]
        max_supply = token_data['max_supply'].iloc[-1]
        
        # Inflation rate
        daily_supply_change = token_data['total_supply'].diff().mean()
        annual_inflation = (daily_supply_change * 365) / total_supply
        
        # Supply distribution
        supply_distribution = {
            'circulating_ratio': circulating_supply / total_supply,
            'locked_ratio': (total_supply - circulating_supply) / total_supply,
            'max_supply_utilization': total_supply / max_supply if max_supply > 0 else 1
        }
        
        return {
            'total_supply': total_supply,
            'circulating_supply': circulating_supply,
            'annual_inflation': annual_inflation,
            'supply_distribution': supply_distribution
        }
    
    # Staking economics
    def analyze_staking_economics(staking_data):
        total_staked = staking_data['total_staked'].iloc[-1]
        staking_apy = staking_data['staking_apy'].iloc[-1]
        validator_count = staking_data['validator_count'].iloc[-1]
        
        # Staking metrics
        staking_ratio = total_staked / token_data['circulating_supply'].iloc[-1]
        annual_rewards = total_staked * staking_apy
        
        # Validator economics
        avg_validator_stake = total_staked / validator_count
        validator_rewards = annual_rewards / validator_count
        
        return {
            'total_staked': total_staked,
            'staking_ratio': staking_ratio,
            'annual_rewards': annual_rewards,
            'validator_count': validator_count,
            'avg_validator_stake': avg_validator_stake,
            'validator_rewards': validator_rewards
        }
    
    # Governance analysis
    def analyze_governance(governance_data):
        total_proposals = len(governance_data)
        passed_proposals = len(governance_data[governance_data['status'] == 'passed'])
        participation_rate = governance_data['participation_rate'].mean()
        
        # Voting power distribution
        voting_power = governance_data['voting_power'].sum()
        gini_coefficient = calculate_gini_coefficient(governance_data['voting_power'])
        
        return {
            'total_proposals': total_proposals,
            'passed_proposals': passed_proposals,
            'pass_rate': passed_proposals / total_proposals,
            'participation_rate': participation_rate,
            'gini_coefficient': gini_coefficient
        }
    
    # Run analyses
    supply_analysis = calculate_supply_dynamics(token_data)
    staking_analysis = analyze_staking_economics(staking_data)
    governance_analysis = analyze_governance(governance_data)
    
    return {
        'supply_analysis': supply_analysis,
        'staking_analysis': staking_analysis,
        'governance_analysis': governance_analysis
    }`
      }
    },
    {
      title: "Market Microstructure",
      icon: "•",
      description: "Analysis of cryptocurrency market microstructure including order book dynamics, trading patterns, and market impact.",
      details: {
        howItWorks: "Examines high-frequency trading data, order book dynamics, and market microstructure to understand price formation and trading behavior.",
        keyComponents: ["Order Book Analysis", "Trade Size Distribution", "Market Impact", "Liquidity Metrics", "Price Discovery"],
        useCases: ["Algorithmic trading", "Market making", "Risk management", "Execution optimization"],
        codeExample: `def market_microstructure_analysis(orderbook_data, trade_data):
    """
    Analyze cryptocurrency market microstructure
    """
    # Order book analysis
    def analyze_orderbook(orderbook_data):
        # Bid-ask spread analysis
        spread = orderbook_data['best_ask'] - orderbook_data['best_bid']
        spread_bps = (spread / orderbook_data['mid_price']) * 10000
        
        # Order book depth
        bid_depth = orderbook_data['bid_depth_1'] + orderbook_data['bid_depth_2'] + orderbook_data['bid_depth_3']
        ask_depth = orderbook_data['ask_depth_1'] + orderbook_data['ask_depth_2'] + orderbook_data['ask_depth_3']
        
        # Imbalance ratio
        imbalance_ratio = (bid_depth - ask_depth) / (bid_depth + ask_depth)
        
        return {
            'avg_spread_bps': spread_bps.mean(),
            'spread_volatility': spread_bps.std(),
            'avg_bid_depth': bid_depth.mean(),
            'avg_ask_depth': ask_depth.mean(),
            'imbalance_ratio': imbalance_ratio.mean()
        }
    
    # Trade analysis
    def analyze_trades(trade_data):
        # Trade size distribution
        trade_sizes = trade_data['size']
        large_trades = trade_sizes[trade_sizes > trade_sizes.quantile(0.95)]
        
        # Price impact analysis
        price_impact = trade_data['price_change'] / trade_data['size']
        
        # Trading volume patterns
        hourly_volume = trade_data.groupby(trade_data['timestamp'].dt.hour)['size'].sum()
        
        return {
            'avg_trade_size': trade_sizes.mean(),
            'large_trade_ratio': len(large_trades) / len(trade_sizes),
            'price_impact': price_impact.mean(),
            'volume_pattern': hourly_volume.to_dict()
        }
    
    # Market quality metrics
    def calculate_market_quality(orderbook_metrics, trade_metrics):
        # Liquidity score (inverse of spread)
        liquidity_score = 1 / orderbook_metrics['avg_spread_bps']
        
        # Market efficiency (price impact)
        efficiency_score = 1 / abs(trade_metrics['price_impact'])
        
        # Overall market quality
        market_quality = (liquidity_score + efficiency_score) / 2
        
        return {
            'liquidity_score': liquidity_score,
            'efficiency_score': efficiency_score,
            'market_quality': market_quality
        }
    
    # Run analyses
    orderbook_metrics = analyze_orderbook(orderbook_data)
    trade_metrics = analyze_trades(trade_data)
    market_quality = calculate_market_quality(orderbook_metrics, trade_metrics)
    
    return {
        'orderbook_metrics': orderbook_metrics,
        'trade_metrics': trade_metrics,
        'market_quality': market_quality
    }`
      }
    },
    {
      title: "Sentiment Analysis",
      icon: "😊",
      description: "Analysis of market sentiment using social media, news, and other textual data to predict price movements.",
      details: {
        howItWorks: "Uses natural language processing and machine learning to analyze text data and extract sentiment signals for trading decisions.",
        keyComponents: ["Text Preprocessing", "Sentiment Scoring", "Feature Engineering", "Machine Learning", "Signal Generation"],
        useCases: ["Trading signals", "Risk management", "Market timing", "Investment decisions"],
        codeExample: `import pandas as pd
from textblob import TextBlob
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import numpy as np

def sentiment_analysis(social_data, news_data, price_data):
    """
    Comprehensive sentiment analysis for crypto markets
    """
    # Social media sentiment
    def analyze_social_sentiment(social_data):
        sentiments = []
        for text in social_data['text']:
            blob = TextBlob(text)
            sentiment = blob.sentiment.polarity  # -1 to 1
            sentiments.append(sentiment)
        
        social_data['sentiment'] = sentiments
        
        # Aggregate sentiment by time
        social_data['timestamp'] = pd.to_datetime(social_data['timestamp'])
        hourly_sentiment = social_data.groupby(social_data['timestamp'].dt.floor('H'))['sentiment'].mean()
        
        return hourly_sentiment
    
    # News sentiment analysis
    def analyze_news_sentiment(news_data):
        # More sophisticated sentiment analysis for news
        vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        X = vectorizer.fit_transform(news_data['headline'] + ' ' + news_data['content'])
        
        # Simple sentiment scoring
        sentiments = []
        for text in news_data['headline'] + ' ' + news_data['content']:
            blob = TextBlob(text)
            sentiment = blob.sentiment.polarity
            sentiments.append(sentiment)
        
        news_data['sentiment'] = sentiments
        
        # Aggregate by time
        news_data['timestamp'] = pd.to_datetime(news_data['timestamp'])
        hourly_news_sentiment = news_data.groupby(news_data['timestamp'].dt.floor('H'))['sentiment'].mean()
        
        return hourly_news_sentiment
    
    # Sentiment-price correlation
    def analyze_sentiment_price_correlation(sentiment_data, price_data):
        # Align timestamps
        price_data['timestamp'] = pd.to_datetime(price_data['timestamp'])
        price_data = price_data.set_index('timestamp')
        
        # Calculate price changes
        price_data['price_change'] = price_data['price'].pct_change()
        
        # Merge sentiment and price data
        merged_data = pd.merge(sentiment_data, price_data, left_index=True, right_index=True, how='inner')
        
        # Correlation analysis
        correlation = merged_data['sentiment'].corr(merged_data['price_change'])
        
        # Lag analysis
        lag_correlations = {}
        for lag in range(1, 25):  # 24 hours
            lagged_sentiment = merged_data['sentiment'].shift(lag)
            lag_corr = lagged_sentiment.corr(merged_data['price_change'])
            lag_correlations[lag] = lag_corr
        
        return {
            'correlation': correlation,
            'lag_correlations': lag_correlations,
            'merged_data': merged_data
        }
    
    # Generate trading signals
    def generate_sentiment_signals(sentiment_data, price_data, threshold=0.1):
        # Calculate sentiment momentum
        sentiment_momentum = sentiment_data.rolling(window=24).mean()
        
        # Generate signals
        signals = []
        for i, (timestamp, sentiment) in enumerate(sentiment_momentum.items()):
            if sentiment > threshold:
                signals.append(('BUY', timestamp, sentiment))
            elif sentiment < -threshold:
                signals.append(('SELL', timestamp, sentiment))
            else:
                signals.append(('HOLD', timestamp, sentiment))
        
        return signals
    
    # Run analyses
    social_sentiment = analyze_social_sentiment(social_data)
    news_sentiment = analyze_news_sentiment(news_data)
    
    # Combine sentiment sources
    combined_sentiment = (social_sentiment + news_sentiment) / 2
    
    # Analyze correlations
    correlation_analysis = analyze_sentiment_price_correlation(combined_sentiment, price_data)
    
    # Generate signals
    trading_signals = generate_sentiment_signals(combined_sentiment, price_data)
    
    return {
        'social_sentiment': social_sentiment,
        'news_sentiment': news_sentiment,
        'combined_sentiment': combined_sentiment,
        'correlation_analysis': correlation_analysis,
        'trading_signals': trading_signals
    }`
      }
    },
    {
      title: "Volatility Modeling",
      icon: "•",
      description: "Advanced models for cryptocurrency volatility including GARCH, stochastic volatility, and regime-switching models.",
      details: {
        howItWorks: "Uses time series models to capture the clustering and persistence of volatility in cryptocurrency markets.",
        keyComponents: ["GARCH Models", "Stochastic Volatility", "Regime Switching", "Volatility Forecasting", "Risk Metrics"],
        useCases: ["Risk management", "Options pricing", "Portfolio optimization", "Trading strategies"],
        codeExample: `import numpy as np
import pandas as pd
from arch import arch_model
from sklearn.mixture import GaussianMixture

def volatility_modeling(price_data):
    """
    Comprehensive volatility modeling for cryptocurrencies
    """
    # Calculate returns
    returns = price_data['price'].pct_change().dropna()
    
    # GARCH(1,1) model
    def fit_garch_model(returns):
        model = arch_model(returns, vol='Garch', p=1, q=1)
        fitted_model = model.fit()
        
        # Forecast volatility
        forecasts = fitted_model.forecast(horizon=30)
        volatility_forecast = np.sqrt(forecasts.variance.values[-1])
        
        return {
            'model': fitted_model,
            'volatility_forecast': volatility_forecast,
            'aic': fitted_model.aic,
            'bic': fitted_model.bic
        }
    
    # Regime-switching volatility model
    def fit_regime_switching_model(returns):
        # Simple two-regime model using Gaussian Mixture
        gmm = GaussianMixture(n_components=2, random_state=42)
        gmm.fit(returns.values.reshape(-1, 1))
        
        # Regime probabilities
        regime_probs = gmm.predict_proba(returns.values.reshape(-1, 1))
        
        # Regime characteristics
        regime_means = gmm.means_.flatten()
        regime_covariances = gmm.covariances_.flatten()
        
        return {
            'model': gmm,
            'regime_probs': regime_probs,
            'regime_means': regime_means,
            'regime_covariances': regime_covariances
        }
    
    # Realized volatility
    def calculate_realized_volatility(returns, window=24):
        # Rolling realized volatility
        rolling_vol = returns.rolling(window=window).std() * np.sqrt(24)  # Annualized
        
        # High-frequency realized volatility
        hf_returns = returns.resample('1H').last().pct_change().dropna()
        hf_vol = hf_returns.rolling(window=24).std() * np.sqrt(24)
        
        return {
            'rolling_volatility': rolling_vol,
            'hf_volatility': hf_vol,
            'current_vol': rolling_vol.iloc[-1]
        }
    
    # Volatility clustering analysis
    def analyze_volatility_clustering(returns):
        # Calculate absolute returns
        abs_returns = np.abs(returns)
        
        # Ljung-Box test for serial correlation
        from statsmodels.stats.diagnostic import acorr_ljungbox
        ljung_box = acorr_ljungbox(abs_returns, lags=10, return_df=True)
        
        # ARCH-LM test
        from arch.unitroot import ARCH
        arch_test = ARCH(abs_returns, lags=5)
        
        return {
            'ljung_box_stat': ljung_box['lb_stat'].iloc[-1],
            'ljung_box_pvalue': ljung_box['lb_pvalue'].iloc[-1],
            'arch_lm_stat': arch_test.stat,
            'arch_lm_pvalue': arch_test.pvalue
        }
    
    # Run analyses
    garch_results = fit_garch_model(returns)
    regime_results = fit_regime_switching_model(returns)
    realized_vol = calculate_realized_volatility(returns)
    clustering_analysis = analyze_volatility_clustering(returns)
    
    return {
        'garch_results': garch_results,
        'regime_results': regime_results,
        'realized_volatility': realized_vol,
        'clustering_analysis': clustering_analysis,
        'returns': returns
    }`
      }
    }
  ];

  const applications = [
    {
      title: "Cryptocurrency Trading",
      description: "Develop algorithmic trading strategies using blockchain analysis, sentiment, and volatility models.",
      tools: ["Blockchain Analysis", "Sentiment Analysis", "Volatility Modeling", "Market Microstructure"],
      example: "Build a trading bot that uses sentiment analysis and volatility forecasting to execute trades on cryptocurrency exchanges."
    },
    {
      title: "DeFi Investment",
      description: "Analyze and optimize investments in decentralized finance protocols and yield farming strategies.",
      tools: ["DeFi Protocol Analysis", "Tokenomics Modeling", "Risk Assessment", "Yield Optimization"],
      example: "Evaluate different liquidity pools and yield farming opportunities to maximize returns while managing impermanent loss."
    },
    {
      title: "Risk Management",
      description: "Implement risk management frameworks for cryptocurrency portfolios and DeFi positions.",
      tools: ["Volatility Modeling", "Blockchain Analysis", "Market Microstructure", "Portfolio Optimization"],
      example: "Develop a risk management system that monitors portfolio exposure and automatically adjusts positions based on volatility forecasts."
    },
    {
      title: "Regulatory Compliance",
      description: "Build compliance tools for cryptocurrency transactions and DeFi protocol monitoring.",
      tools: ["Blockchain Analysis", "Transaction Monitoring", "Address Clustering", "Risk Assessment"],
      example: "Create a compliance dashboard that tracks suspicious transactions and monitors regulatory requirements for cryptocurrency businesses."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Crypto Modeling
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master advanced modeling techniques for cryptocurrency markets, DeFi protocols, and blockchain analysis
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="#topics">
                  Explore Topics
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
              >
                <Link href="#applications">
                  View Applications
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Crypto Topics Section */}
        <div id="topics" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">₿ Core Crypto Modeling Concepts</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn advanced modeling techniques specifically designed for cryptocurrency markets and blockchain technology.
            </p>
          </div>

          <div className="space-y-8">
            {cryptoTopics.map((topic, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{topic.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg">{topic.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">How It Works</h4>
                        <p className="text-gray-300 text-sm mb-4">{topic.details.howItWorks}</p>
                        
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Key Components</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {topic.details.keyComponents.map((component, idx) => (
                            <li key={idx}>• {component}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Crypto Use Cases</h4>
                        <ul className="text-gray-300 text-sm space-y-1 mb-4">
                          {topic.details.useCases.map((useCase, idx) => (
                            <li key={idx}>• {useCase}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Code Example</h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                          <pre className="text-green-400 text-xs overflow-x-auto">
                            <code>{topic.details.codeExample}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div id="applications" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">💼 Professional Applications</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover how crypto modeling techniques are applied across different areas of cryptocurrency and DeFi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{app.title}</h3>
                <p className="text-gray-300 mb-4">{app.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Common Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                  <h4 className="text-sm font-semibold text-green-400 mb-1">Example</h4>
                  <p className="text-gray-300 text-sm">{app.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Learning Path</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">1</div>
                <h4 className="text-white font-semibold mb-2">Blockchain Basics</h4>
                <p className="text-gray-300 text-sm">Understanding blockchain technology</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-white font-semibold mb-2">Market Analysis</h4>
                <p className="text-gray-300 text-sm">Price analysis, volatility modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-white font-semibold mb-2">DeFi Protocols</h4>
                <p className="text-gray-300 text-sm">Protocol analysis, tokenomics</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-white font-semibold mb-2">Advanced Topics</h4>
                <p className="text-gray-300 text-sm">Sentiment analysis, trading strategies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Software Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Essential Tools & Software</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-400 text-xs">Primary language</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Web3.py</h4>
                <p className="text-gray-400 text-xs">Blockchain interaction</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Pandas</h4>
                <p className="text-gray-400 text-xs">Data manipulation</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">NetworkX</h4>
                <p className="text-gray-400 text-xs">Graph analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">CCXT</h4>
                <p className="text-gray-400 text-xs">Exchange APIs</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">TextBlob</h4>
                <p className="text-gray-400 text-xs">Sentiment analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">ARCH</h4>
                <p className="text-gray-400 text-xs">Volatility modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">FastAPI</h4>
                <p className="text-gray-400 text-xs">API development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Crypto Modeling?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Build expertise in advanced modeling techniques for cryptocurrency markets, DeFi protocols, and blockchain analysis.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              <Link href="/learn/statistics-probability">
                Start with Statistics
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
            >
              <Link href="/learn">
                Back to Learn
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
